/** Simulates network latency so service functions behave like future HTTP calls. */
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}
