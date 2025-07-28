import crypto from 'crypto'
import { existsSync, mkdirSync } from 'fs'
import fs from 'fs/promises'
import path from 'path'
import simpleGit from 'simple-git'
import Parser from 'tree-sitter'
// Import language grammars (add more as needed)
import Sql from '@derekstride/tree-sitter-sql'
import JavaScript from 'tree-sitter-javascript'
import Python from 'tree-sitter-python'
import { tsx, typescript } from 'tree-sitter-typescript'
// Add more grammars as needed

const DEFAULT_REPO_PATH = `/Users/bhargavponnapalli/Arni/nextbase-repos/nextbase-essential`
const TMP_DIR = path.resolve('.tmp')

interface Chunk {
  filePath: string
  language: string
  type: string
  name: string
  startLine: number
  endLine: number
  code: string
}

// Map file extensions to tree-sitter language modules
const extensionToLanguage: Record<string, { name: string; module: any }> = {
  '.js': { name: 'javascript', module: JavaScript },
  '.ts': { name: 'typescript', module: typescript }, // Use JS grammar for TS for demo
  '.py': { name: 'python', module: Python },
  '.tsx': { name: 'typescript-react', module: tsx },
  '.sql': { name: 'sql', module: Sql },
  // Add more mappings as needed
}

function getLanguageByExtension(ext: string) {
  return extensionToLanguage[ext]
}

async function getGitTrackedFiles(repoPath: string): Promise<string[]> {
  const git = simpleGit(repoPath)
  const files = await git.raw(['ls-files'])
  return files.split('\n').filter(Boolean)
}

function getChunksForTree(tree: Parser.Tree, source: string, language: string, filePath: string): Chunk[] {
  // For demo: chunk by function, class, or top-level declarations
  const chunks: Chunk[] = []
  function visit(node: Parser.SyntaxNode) {
    if (language === 'typescript' || language === 'typescript-react') {
      console.log('node type', node.type)
    }
    if (
      (language === 'javascript' && ['function_declaration', 'class_declaration'].includes(node.type)) ||
      (language === 'typescript' && ['function_declaration', 'class_declaration'].includes(node.type)) ||
      (language === 'typescript-react' && ['function_declaration', 'class_declaration'].includes(node.type)) ||
      (language === 'python' && ['function_definition', 'class_definition'].includes(node.type)) ||
      (language === 'sql' && ['add_column', 'create_table', 'create_index'].includes(node.type))
    ) {
      const startLine = node.startPosition.row + 1
      const endLine = node.endPosition.row + 1
      const code = source.split('\n').slice(startLine - 1, endLine).join('\n')
      chunks.push({
        filePath,
        language,
        type: node.type,
        name: node.childForFieldName('name')?.text || '<anonymous>',
        startLine,
        endLine,
        code,
      })
    }
    for (let i = 0; i < node.childCount; i++) {
      const child = node.child(i)
      if (child) visit(child)
    }
  }
  visit(tree.rootNode)
  return chunks
}

function obfuscateFileName(relFilePath: string, chunkIdx: number, ext: string) {
  const dir = path.dirname(relFilePath)
  const base = path.basename(relFilePath, ext)
  const hash = crypto.createHash('sha256').update(base).digest('hex').slice(0, 16)
  return { dir, file: `${hash}-${chunkIdx}${ext}` }
}

async function ensureTmpDir() {
  if (!existsSync(TMP_DIR)) {
    mkdirSync(TMP_DIR)
  }
}

async function writeChunkToFile(chunk: Chunk, chunkIdx: number) {
  const ext = path.extname(chunk.filePath)
  const dir = path.dirname(chunk.filePath)
  const base = path.basename(chunk.filePath, ext)
  const outDir = path.join(TMP_DIR, dir)
  console.log('outDir', outDir)
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true })
  }
  console.log('outDir', outDir)
  const outPath = path.join(outDir, `${base}-chunk${chunkIdx}${ext}`)
  await fs.writeFile(outPath, chunk.code, 'utf8')
}

async function main() {
  const repoPath = process.argv[2] || DEFAULT_REPO_PATH
  if (!existsSync(path.join(repoPath, '.git'))) {
    console.error('Not a git repository:', repoPath)
    process.exit(1)
  }
  await ensureTmpDir()
  const files = await getGitTrackedFiles(repoPath)
  console.log(`Found ${files.length} tracked files in ${repoPath}`)
  const allChunks: Chunk[] = []
  for (const relFilePath of files) {
    const absFilePath = path.join(repoPath, relFilePath)
    const ext = path.extname(relFilePath)
    const langInfo = getLanguageByExtension(ext)
    console.log('file path', relFilePath, langInfo?.name ?? 'unknown')
    if (!langInfo) continue
    let source: string
    try {
      source = await fs.readFile(absFilePath, 'utf8')
    } catch (e) {
      console.warn('Failed to read', relFilePath)
      continue
    }
    const parser = new Parser()
    parser.setLanguage(langInfo.module)
    let tree: Parser.Tree
    try {
      tree = parser.parse(source)
    } catch (e) {
      console.warn('Failed to parse', relFilePath)
      continue
    }
    const chunks = getChunksForTree(tree, source, langInfo.name, relFilePath)
    console.log('chunks', chunks.length)
    for (let i = 0; i < chunks.length; i++) {
      console.log('writing chunk', chunks[i].filePath)
      await writeChunkToFile(chunks[i], i)
    }
    allChunks.push(...chunks)
  }
  // Log the first 10 chunks
  // allChunks.slice(0, 10).forEach((chunk, i) => {
  //   console.log(`\n[${i + 1}] ${chunk.filePath} (${chunk.language}) ${chunk.type} ${chunk.name} [${chunk.startLine}-${chunk.endLine}]`)
  //   console.log(chunk.code)
  // })
  // console.log(`\nTotal chunks: ${allChunks.length}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
