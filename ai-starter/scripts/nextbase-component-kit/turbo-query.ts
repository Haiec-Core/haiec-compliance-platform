/**
 * npm install @turbopuffer/turbopuffer openai
 *
 * Environment:
 *   OPENAI_API_KEY       – for embeddings
 *   TURBOPUFFER_API_KEY  – for turbopuffer
 *   TP_NAMESPACE         – turbopuffer namespace to search
 */

import { Turbopuffer } from '@turbopuffer/turbopuffer';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config({
  path: '.env.local'
});

const TP_NAMESPACE = `nextbase-component-kit-2`;

// ---------- initialise clients ----------
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
if (!process.env.TURBOPUFFER_WRITE_API_KEY) {
  throw new Error('TURBOPUFFER_WRITE_API_KEY is not set');
}
const tpuf = new Turbopuffer({ apiKey: process.env.TURBOPUFFER_WRITE_API_KEY });
const ns = tpuf.namespace(TP_NAMESPACE);

// ---------- search interface ----------
interface SearchResult {
  id: string;
  file_path: string;
  start_line: number;
  end_line: number;
  score: number;
}

// ---------- search function ----------
async function searchCode(query: string, limit: number = 10): Promise<SearchResult[]> {
  try {
    // 1) create embedding for the query
    const { data: [{ embedding }] } = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query
    });

    // 2) search turbopuffer
    const results = await ns.query({
      rank_by: ['vector', 'ANN', embedding],
      top_k: limit,
      include_attributes: ['file_path', 'start_line', 'end_line'],
      consistency: {
        level: 'strong'
      }
    });

    // 3) format results
    return results.rows.map(result => ({
      id: result.id as string,
      file_path: result.file_path as string,
      start_line: result.start_line as number,
      end_line: result.end_line as number,
      score: result.$dist || 0
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

// ---------- CLI interface ----------
async function main() {
  const query = process.argv[2];
  const limit = parseInt(process.argv[3]) || 10;

  if (!query) {
    console.log('Usage: npx tsx turbo-query.ts "search query" [limit]');
    console.log('Example: npx tsx turbo-query.ts "authentication function" 5');
    process.exit(1);
  }

  try {
    console.log(`Searching for: "${query}"`);
    console.log(`Limit: ${limit}`);
    console.log('---');

    const results = await searchCode(query, limit);

    if (results.length === 0) {
      console.log('No results found.');
      return;
    }

    results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.file_path}:${result.start_line}-${result.end_line}`);
      console.log(`   Score: ${result.score.toFixed(4)}`);
    });

    console.log(`\nFound ${results.length} results.`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// ---------- export for programmatic use ----------
export { searchCode };
export type { SearchResult };

// ---------- run if called directly ----------
if (require.main === module) {
  main();
}
