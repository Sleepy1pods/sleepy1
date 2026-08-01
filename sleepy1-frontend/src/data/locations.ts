import type { Location } from '@/types/location'

/**
 * DEMO DATA NOTICE
 * All location records below are illustrative MVP content for the Sleepy1 frontend.
 * `isDemoData: true` marks records whose operational status, pod counts, live availability,
 * exact pricing, and map coordinates should be confirmed before production launch.
 */
export const locations: Location[] = [
  {
    id: 'loc-bvb-campus-hubli',
    slug: 'bvb-campus-hubli',
    name: 'BVB Campus Hubli',
    shortName: 'BVB Hubli',
    hubType: 'campus',
    city: 'Hubli',
    state: 'Karnataka',
    terminal: 'Campus Hub',
    isDemoData: true,
    heroImage: 'campus-hub-1',
    galleryImages: ['pod-interior-1', 'pod-exterior-1', 'pod-desk-1', 'pod-detail-1'],
    podCount: 10,
    availablePods: 6,
    availability: 'medium',
    startingPricePerHour: 399,
    amenityIds: ['lighting', 'wifi', 'lock', 'charging', 'mattress', 'ventilation'],
    operatingHours: { opens: '06:00', closes: '23:00', is24x7: false },
    geo: { lat: 15.3699, lng: 75.1239 },
    instructions: [
      'Sleepy1 pods are planned near the main campus activity zone.',
      'Keep your booking QR code ready for smart check-in.',
      'Arrive no earlier than 15 minutes before your slot.',
    ],
    nearbyFacilities: [
      { label: 'Campus Entrance', distanceMeters: 80, type: 'transport' },
      { label: 'Student Lounge', distanceMeters: 120, type: 'lounge' },
      { label: 'Cafeteria', distanceMeters: 160, type: 'food' },
    ],
    description: 'A private rest stop for students, faculty, visitors, and guests moving through the BVB campus in Hubli.',
    featured: true,
  },
  {
    id: 'loc-iiit-dharwad-research-park',
    slug: 'iiit-dharwad-research-park',
    name: 'IIIT Dharwad Research Park',
    shortName: 'IIIT Dharwad',
    hubType: 'campus',
    city: 'Dharwad',
    state: 'Karnataka',
    terminal: 'Research Park',
    isDemoData: true,
    heroImage: 'campus-hub-2',
    galleryImages: ['pod-interior-2', 'pod-exterior-2', 'pod-desk-2', 'pod-detail-2'],
    podCount: 8,
    availablePods: 5,
    availability: 'medium',
    startingPricePerHour: 399,
    amenityIds: ['charging', 'display', 'wifi', 'lock', 'climate', 'mattress'],
    operatingHours: { opens: '06:00', closes: '23:00', is24x7: false },
    geo: { lat: 15.4592, lng: 74.9856 },
    instructions: [
      'Pods are planned for the research park visitor area.',
      'Use your booking QR code for keyless access.',
      'Follow on-site signage after entering the research park.',
    ],
    nearbyFacilities: [
      { label: 'Research Block', distanceMeters: 70, type: 'lounge' },
      { label: 'Visitor Parking', distanceMeters: 140, type: 'transport' },
      { label: 'Cafe Zone', distanceMeters: 180, type: 'food' },
    ],
    description: 'A quiet recovery space for long research days, campus visits, events, and late work sessions at IIIT Dharwad.',
    featured: true,
  },
  {
    id: 'loc-hubli-railway-station',
    slug: 'hubli-railway-station',
    name: 'Hubli Railway Station',
    shortName: 'Hubli Junction',
    hubType: 'railway',
    city: 'Hubli',
    state: 'Karnataka',
    terminal: 'Station Concourse',
    isDemoData: true,
    heroImage: 'railway-hub-1',
    galleryImages: ['pod-interior-3', 'pod-exterior-1', 'pod-desk-2', 'pod-detail-3'],
    podCount: 12,
    availablePods: 7,
    availability: 'high',
    startingPricePerHour: 349,
    amenityIds: ['lock', 'wifi', 'charging', 'ventilation', 'mattress'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 15.3501, lng: 75.1376 },
    instructions: [
      'Pods are planned near the main concourse waiting area.',
      'Keep your train ticket and Sleepy1 booking QR ready.',
      'Check station access rules before arrival during late-night hours.',
    ],
    nearbyFacilities: [
      { label: 'Main Concourse', distanceMeters: 50, type: 'transport' },
      { label: 'Waiting Hall', distanceMeters: 80, type: 'lounge' },
      { label: 'Refreshments', distanceMeters: 120, type: 'food' },
    ],
    description: 'A rest hub for passengers waiting between train journeys at Hubli Railway Station.',
    featured: true,
  },
  {
    id: 'loc-kle-it',
    slug: 'kle-it',
    name: 'KLE IT',
    shortName: 'KLE IT',
    hubType: 'campus',
    city: 'Hubli',
    state: 'Karnataka',
    terminal: 'Institute Hub',
    isDemoData: true,
    heroImage: 'campus-hub-3',
    galleryImages: ['pod-interior-1', 'pod-exterior-3', 'pod-desk-3', 'pod-detail-1'],
    podCount: 8,
    availablePods: 4,
    availability: 'low',
    startingPricePerHour: 399,
    amenityIds: ['wifi', 'charging', 'lock', 'ventilation', 'climate'],
    operatingHours: { opens: '06:00', closes: '23:00', is24x7: false },
    geo: { lat: 15.3708, lng: 75.1244 },
    instructions: [
      'Pods are planned inside the campus rest and visitor zone.',
      'Scan your QR code at the pod door to check in.',
      'Campus access may require an institute visitor pass.',
    ],
    nearbyFacilities: [
      { label: 'Academic Block', distanceMeters: 90, type: 'lounge' },
      { label: 'Campus Gate', distanceMeters: 130, type: 'transport' },
      { label: 'Cafeteria', distanceMeters: 170, type: 'food' },
    ],
    description: 'A compact private rest zone for students, staff, and visitors at KLE IT in Hubli.',
    featured: true,
  },
  {
    id: 'loc-hubli-airport',
    slug: 'hubli-airport',
    name: 'Hubli Airport',
    shortName: 'Hubli Airport',
    hubType: 'airport',
    city: 'Hubli',
    state: 'Karnataka',
    terminal: 'Passenger Terminal',
    isDemoData: true,
    heroImage: 'airport-terminal-1',
    galleryImages: ['pod-interior-2', 'pod-exterior-2', 'pod-desk-1', 'pod-detail-2'],
    podCount: 10,
    availablePods: 6,
    availability: 'medium',
    startingPricePerHour: 449,
    amenityIds: ['display', 'wifi', 'mattress', 'lock', 'lighting', 'charging'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 15.3617, lng: 75.0849 },
    instructions: [
      'Pods are planned near the passenger terminal waiting area.',
      'Arrive with your boarding pass and Sleepy1 booking QR code ready.',
      'Airport security and access rules apply.',
    ],
    nearbyFacilities: [
      { label: 'Terminal Entrance', distanceMeters: 70, type: 'transport' },
      { label: 'Waiting Area', distanceMeters: 60, type: 'lounge' },
      { label: 'Food Counter', distanceMeters: 120, type: 'food' },
      { label: 'Security Check', distanceMeters: 160, type: 'security' },
    ],
    description: 'A quiet rest option for flyers, visitors, and delayed travellers moving through Hubli Airport.',
    featured: true,
  },
]

export const locationMap: Record<string, Location> = Object.fromEntries(
  locations.map((l) => [l.slug, l]),
)

export function getLocationBySlug(slug: string): Location | undefined {
  return locationMap[slug]
}

export function getFeaturedLocations(): Location[] {
  return locations.filter((l) => l.featured)
}

export const cities: string[] = Array.from(new Set(locations.map((l) => l.city))).sort()
