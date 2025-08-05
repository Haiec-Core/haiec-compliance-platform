/**
 * npm install @turbopuffer/turbopuffer openai simple-git
 *              tree-sitter tree-sitter-javascript tree-sitter-typescript
 *
 * Environment:
 *   OPENAI_API_KEY       – for embeddings
 *   TURBOPUFFER_API_KEY  – for turbopuffer
 *   TP_NAMESPACE         – turbopuffer namespace to write into
 */

import { Turbopuffer } from '@turbopuffer/turbopuffer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import path from 'path';
import simpleGit from 'simple-git';
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import TypeScript from 'tree-sitter-typescript';
import { processFullyInParallel } from '../../src/utils/parallel-processing';

dotenv.config({
  path: '.env.local'
});

function hashifyFilePath(filePath: string): string {
  return crypto.createHash('md5').update(filePath).digest('hex');
}

const TP_NAMESPACE = `nextbase-component-kit-2`
const REPO_PATH = '/Users/bhargavponnapalli/Arni/nextbase-repos/nextbase-component-kit'
// ---------- initialise clients ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
if (!process.env.TURBOPUFFER_WRITE_API_KEY) {
  throw new Error('TURBOPUFFER_WRITE_API_KEY is not set');
}
const tpuf = new Turbopuffer({ apiKey: process.env.TURBOPUFFER_WRITE_API_KEY });
const ns = tpuf.namespace(TP_NAMESPACE);

// ---------- helper: create one chunk ----------
type Chunk = {
  id: string;
  file_path: string;
  start_line: number;
  end_line: number;
  code: string;
}

type EmbeddedChunk = Omit<Chunk, 'code'> & {
  vector: number[];
}


// ---------- get git tracked files ----------
async function getGitTrackedFiles(): Promise<string[]> {
  const git = simpleGit(REPO_PATH);

  // Check if we're in a git repository
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    throw new Error(`Not a git repository: ${REPO_PATH}`);
  }

  // Get all tracked files
  const files = await git.raw(['ls-files']);
  const onlyJsTsFiles = files
    .split('\n')
    .filter(Boolean)
    .filter(file => /\.(js|jsx|ts|tsx)$/.test(file)); // Only JS/TS files
  console.log(onlyJsTsFiles);
  return onlyJsTsFiles;
}

// ---------- helper: find preceding comments ----------
function findPrecedingComments(source: string, nodeStartLine: number): { startLine: number; comments: string[] } {
  const lines = source.split('\n');
  const comments: string[] = [];
  let currentLine = nodeStartLine - 2; // Start from line before the node (0-based)

  // Look backwards for JSDoc/TSDoc comments
  while (currentLine >= 0) {
    const line = lines[currentLine].trim();

    // Check if this line is part of a block comment
    if (line.endsWith('*/')) {
      // Found end of block comment, collect all lines until start
      const commentLines: string[] = [lines[currentLine]];
      currentLine--;

      while (currentLine >= 0) {
        const commentLine = lines[currentLine];
        commentLines.unshift(commentLine);

        if (commentLine.trim().startsWith('/**') || commentLine.trim().startsWith('/*')) {
          // Found start of block comment
          comments.unshift(...commentLines);
          return {
            startLine: currentLine + 1, // Convert to 1-based
            comments
          };
        }
        currentLine--;
      }
      break;
    }
    // Check for single-line comments
    else if (line.startsWith('//')) {
      comments.unshift(lines[currentLine]);
      currentLine--;
    }
    // Stop if we hit a non-comment, non-empty line
    else if (line !== '') {
      break;
    }
    // Skip empty lines
    else {
      currentLine--;
    }
  }

  if (comments.length > 0) {
    return {
      startLine: nodeStartLine - comments.length, // Approximate start
      comments
    };
  }

  return { startLine: nodeStartLine, comments: [] };
}

// ---------- parse a single file with Tree‑sitter ----------
async function parseFile({ relativeFilePath, absoluteFilePath }: { relativeFilePath: string, absoluteFilePath: string }): Promise<Chunk[]> {
  console.log(`Parsing ${relativeFilePath}`);
  const source = await fs.readFile(absoluteFilePath, 'utf8');
  const isTS = /\.(ts|tsx)$/.test(relativeFilePath);
  const isTSX = /\.(tsx)$/.test(relativeFilePath);

  const parser = new Parser();
  // @ts-ignore
  parser.setLanguage(isTSX ? TypeScript.tsx : isTS ? TypeScript.typescript : JavaScript);

  const tree = parser.parse(source);
  const chunks: Chunk[] = [];

  // We treat top‑level functions, classes and exported declarations as chunks
  tree.rootNode.children.forEach(node => {
    if (['function_declaration',
      'class_declaration',
      'lexical_declaration',
      'export_statement',
      'interface_declaration',
      'type_alias_declaration',
      'enum_declaration'].includes(node.type)) {

      const nodeStartLine = node.startPosition.row + 1; // 1‑based
      const nodeEndLine = node.endPosition.row + 1;

      // Find any preceding JSDoc/TSDoc comments
      const { startLine: commentStartLine, comments } = findPrecedingComments(source, nodeStartLine);

      const actualStartLine = comments.length > 0 ? commentStartLine : nodeStartLine;

      // Extract the code including comments
      const codeLines = source.split('\n').slice(actualStartLine - 1, nodeEndLine);
      const code = codeLines.join('\n');

      chunks.push({
        id: `${hashifyFilePath(relativeFilePath)}:${actualStartLine}-${nodeEndLine}`,
        file_path: relativeFilePath,
        start_line: actualStartLine,
        end_line: nodeEndLine,
        code
      });
    }
  });

  // fallback: if nothing matched, index the whole file
  if (chunks.length === 0) {
    console.log(`No chunks found for ${relativeFilePath}`);
    chunks.push({
      id: `${relativeFilePath}:1-${source.split('\n').length}`,
      file_path: relativeFilePath,
      start_line: 1,
      end_line: source.split('\n').length,
      code: source
    });
  }

  return chunks;
}

// ---------- embed & upload ----------
async function embedAndUpload(chunks: Chunk[]) {
  console.log(`Starting to process ${chunks.length} chunks in parallel...`);

  const results = await processFullyInParallel(
    chunks,
    async (chunk) => {
      try {
        // 1) create embedding
        const { data: [{ embedding }] } = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk.code
        });

        const row: EmbeddedChunk = {
          id: chunk.id,
          vector: embedding,
          file_path: chunk.file_path,
          start_line: chunk.start_line,
          end_line: chunk.end_line,
        };

        // 2) upsert into turbopuffer
        await ns.write({
          upsert_rows: [row],
          distance_metric: 'cosine_distance',
        });

        console.log(`Indexed ${chunk.id}`);
        return chunk.id;
      } catch (error) {
        console.error(`Failed to process chunk ${chunk.id}:`, error);
        throw error; // Re-throw to maintain error handling
      }
    }
  );

  console.log(`Successfully processed ${results.length} chunks`);
}

// ---------- main ----------
(async () => {

  try {
    // Get git-tracked JS/TS files
    const relativeFilePaths = await getGitTrackedFiles();
    console.log(`Found ${relativeFilePaths.length} tracked JS/TS files`);
    // Process all files in parallel
    await processFullyInParallel(
      relativeFilePaths,
      async (file) => {
        try {
          const absoluteFilePath = path.join(REPO_PATH, file);
          const chunks = await parseFile({
            relativeFilePath: file,
            absoluteFilePath: absoluteFilePath
          });
          await embedAndUpload(chunks);
          return file;
        } catch (error) {
          console.warn(`Failed to process ${file}:`, error);
          return null;
        }
      }
    );

    console.log('Done 🎉');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
