export function sum(array: number[]): number {
  return array.reduce((agg, cur) => agg + cur, 0)
}