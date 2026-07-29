import type { Amenity } from '@/types/common'

export const amenities: Amenity[] = [
  { id: 'wifi', label: 'High-Speed WiFi', description: 'Dedicated fibre-backed WiFi for calls, streaming, and uploads.', icon: 'wifi' },
  { id: 'lighting', label: 'Ambient LED Lighting', description: 'Circadian lighting that gently dims from daylight tones to calming sleep-amber.', icon: 'lighting' },
  { id: 'charging', label: 'Universal Charging', description: 'USB-C, USB-A, and international power outlets bedside.', icon: 'charging' },
  { id: 'lock', label: 'Smart Access Lock', description: 'Keyless QR entry with one-time access codes, no shared keys.', icon: 'lock' },
  { id: 'ventilation', label: 'Fresh-Air Ventilation', description: 'HEPA-filtered continuous air exchange for every stay.', icon: 'ventilation' },
  { id: 'mattress', label: 'Ergonomic Mattress', description: 'Orthopaedic memory-foam bedding engineered for short, deep rest.', icon: 'mattress' },
  { id: 'noise', label: 'Acoustic Isolation', description: 'Sound-dampened walls that mute terminal noise and announcements.', icon: 'noise' },
  { id: 'shower', label: 'Shower Access', description: 'On-site shower suites at select locations, bookable as an add-on.', icon: 'shower' },
  { id: 'climate', label: 'Smart Climate Control', description: 'Personal temperature control inside every pod.', icon: 'climate' },
  { id: 'housekeeping', label: 'Housekeeping Between Stays', description: 'Linen and surfaces reset and sanitised after every guest.', icon: 'housekeeping' },
  { id: 'display', label: 'Smart Entertainment Panel', description: 'Tablet control for music, shows, lighting, and wake alarms.', icon: 'display' },
]

export const amenityMap: Record<string, Amenity> = Object.fromEntries(
  amenities.map((a) => [a.id, a]),
)

export function getAmenitiesByIds(ids: string[]): Amenity[] {
  return ids.map((id) => amenityMap[id]).filter((a): a is Amenity => Boolean(a))
}
