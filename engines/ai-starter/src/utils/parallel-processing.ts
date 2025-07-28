/**
 * Process an array of items in parallel batches
 * @param items - Array of items to process
 * @param processor - Async function to process each item
 * @param batchSize - Number of items to process in parallel (default: 5)
 * @returns Promise that resolves when all items are processed
 */
export async function processInParallelBatches<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  batchSize: number = 5
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // Process each batch in parallel
    const batchPromises = batch.map((item, batchIndex) =>
      processor(item, i + batchIndex)
    );
    const batchResults = await Promise.all(batchPromises);

    results.push(...batchResults);
  }

  return results;
}

/**
 * Process an array of items in parallel batches with progress callback
 * @param items - Array of items to process
 * @param processor - Async function to process each item
 * @param onProgress - Callback function called after each batch completion
 * @param batchSize - Number of items to process in parallel (default: 5)
 * @returns Promise that resolves when all items are processed
 */
export async function processInParallelBatchesWithProgress<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>,
  onProgress: (completed: number, total: number, batchNumber: number) => void,
  batchSize: number = 5
): Promise<R[]> {
  const results: R[] = [];
  const totalBatches = Math.ceil(items.length / batchSize);

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;

    // Process each batch in parallel
    const batchPromises = batch.map((item, batchIndex) =>
      processor(item, i + batchIndex)
    );
    const batchResults = await Promise.all(batchPromises);

    results.push(...batchResults);

    // Call progress callback
    onProgress(i + batch.length, items.length, batchNumber);
  }

  return results;
}

/**
 * Process all items fully in parallel (no batching)
 * @param items - Array of items to process
 * @param processor - Async function to process each item
 * @returns Promise that resolves when all items are processed
 */
export async function processFullyInParallel<T, R>(
  items: T[],
  processor: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const promises = items.map((item, index) => processor(item, index));
  return Promise.all(promises);
}
