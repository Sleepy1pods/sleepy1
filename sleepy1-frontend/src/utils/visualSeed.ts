/** Derives a small deterministic seed from an id string, used to vary illustration tones. */
export function seedFromId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 997
  }
  return hash
}
