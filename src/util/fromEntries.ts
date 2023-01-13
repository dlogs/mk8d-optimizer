export function fromEntries<TKey extends string, TValue>(
  entries: Iterable<readonly [TKey, TValue]>,
): Record<TKey, TValue> {
  return Object.fromEntries(entries) as Record<TKey, TValue>
}
