import type { Location } from '@/types/location'

/**
 * DEMO DATA NOTICE
 * All location records below are illustrative MVP content for the Sleepy1 frontend.
 * `isDemoData: true` marks records whose operational status (pod counts, live availability,
 * exact pricing) is not yet confirmed by the business. Airports named here are shown in
 * Sleepy1's public "Trusted By" materials, but pod counts/pricing remain placeholders
 * until backend integration.
 */
export const locations: Location[] = [
  {
    id: 'loc-bom',
    slug: 'mumbai-international-airport',
    name: 'Mumbai International Airport',
    shortName: 'Mumbai T2',
    hubType: 'airport',
    city: 'Mumbai',
    state: 'Maharashtra',
    terminal: 'Terminal 2',
    isDemoData: true,
    heroImage: 'airport-terminal-1',
    galleryImages: ['pod-interior-1', 'pod-exterior-1', 'pod-desk-1', 'pod-detail-1'],
    podCount: 12,
    availablePods: 7,
    availability: 'medium',
    startingPricePerHour: 499,
    amenityIds: ['lighting', 'wifi', 'lock', 'charging', 'mattress', 'ventilation'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 19.0896, lng: 72.8656 },
    instructions: [
      'Pods are located airside, past security, near Gate 42 in the transit lounge corridor.',
      'Arrive with your boarding pass and booking QR code ready for smart check-in.',
      'Check in no earlier than 15 minutes before your slot to keep pods available for other travellers.',
    ],
    nearbyFacilities: [
      { label: 'Gate 40-46 Cluster', distanceMeters: 80, type: 'gate' },
      { label: 'Premium Lounge', distanceMeters: 150, type: 'lounge' },
      { label: 'Food Court', distanceMeters: 120, type: 'food' },
      { label: 'Security Check', distanceMeters: 200, type: 'security' },
    ],
    description: 'Our flagship rest hub inside Mumbai T2, tucked in a quiet corridor away from the concourse rush — ideal for red-eye layovers and early departures.',
    featured: true,
  },
  {
    id: 'loc-del',
    slug: 'delhi-international-airport',
    name: 'Delhi International Airport',
    shortName: 'Delhi T3',
    hubType: 'airport',
    city: 'New Delhi',
    state: 'Delhi',
    terminal: 'Terminal 3',
    isDemoData: true,
    heroImage: 'airport-terminal-2',
    galleryImages: ['pod-interior-2', 'pod-exterior-2', 'pod-desk-2', 'pod-detail-2'],
    podCount: 18,
    availablePods: 11,
    availability: 'high',
    startingPricePerHour: 499,
    amenityIds: ['charging', 'display', 'wifi', 'lock', 'climate', 'mattress'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 28.5562, lng: 77.1000 },
    instructions: [
      'Sleepy1 pods sit within the international transit zone near the duty-free atrium.',
      'International transit passengers can access pods without re-clearing immigration.',
      'A staffed help desk is available 24/7 beside the pod cluster for assistance.',
    ],
    nearbyFacilities: [
      { label: 'Duty Free Atrium', distanceMeters: 60, type: 'food' },
      { label: 'Transit Lounge', distanceMeters: 100, type: 'lounge' },
      { label: 'Metro Connect', distanceMeters: 300, type: 'transport' },
      { label: 'Restrooms', distanceMeters: 40, type: 'restroom' },
    ],
    description: 'Delhi\'s busiest transit hub, reimagined with a private sanctuary for travellers resting between long-haul connections.',
    featured: true,
  },
  {
    id: 'loc-blr',
    slug: 'bengaluru-international-airport',
    name: 'Bengaluru International Airport',
    shortName: 'Bengaluru T1',
    hubType: 'airport',
    city: 'Bengaluru',
    state: 'Karnataka',
    terminal: 'Terminal 1',
    isDemoData: true,
    heroImage: 'airport-terminal-3',
    galleryImages: ['pod-interior-3', 'pod-exterior-3', 'pod-desk-3', 'pod-detail-3'],
    podCount: 15,
    availablePods: 15,
    availability: 'high',
    startingPricePerHour: 549,
    amenityIds: ['ventilation', 'wifi', 'lock', 'mattress', 'noise', 'lighting'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 13.1986, lng: 77.7066 },
    instructions: [
      'Located near the biodiversity garden wing, a short walk from the central atrium.',
      'Ideal for the city\'s frequent early-morning tech-corridor departures.',
      'Locker storage is available on request at the pod concierge desk.',
    ],
    nearbyFacilities: [
      { label: 'Garden Atrium', distanceMeters: 50, type: 'lounge' },
      { label: 'Boarding Gates 1-8', distanceMeters: 180, type: 'gate' },
      { label: 'Cafés', distanceMeters: 90, type: 'food' },
    ],
    description: 'A calm retreat beside Bengaluru\'s landscaped terminal gardens, built for travellers who need a quiet place to recover before or after a long journey.',
    featured: true,
  },
  {
    id: 'loc-maa',
    slug: 'chennai-international-airport',
    name: 'Chennai International Airport',
    shortName: 'Chennai T1',
    hubType: 'airport',
    city: 'Chennai',
    state: 'Tamil Nadu',
    terminal: 'Terminal 1',
    isDemoData: true,
    heroImage: 'airport-terminal-4',
    galleryImages: ['pod-interior-1', 'pod-exterior-2', 'pod-desk-3', 'pod-detail-2'],
    podCount: 10,
    availablePods: 4,
    availability: 'low',
    startingPricePerHour: 469,
    amenityIds: ['wifi', 'charging', 'lock', 'ventilation', 'climate'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 12.9941, lng: 80.1709 },
    instructions: [
      'Pods are positioned along the domestic-international connector bridge.',
      'Recommended for overnight layovers on the Chennai–Southeast Asia routes.',
    ],
    nearbyFacilities: [
      { label: 'Connector Bridge', distanceMeters: 30, type: 'transport' },
      { label: 'Security Check', distanceMeters: 140, type: 'security' },
    ],
    description: 'A quiet stretch of Chennai\'s connector bridge converted into a private rest zone for transiting travellers.',
    featured: false,
  },
  {
    id: 'loc-hyd',
    slug: 'hyderabad-international-airport',
    name: 'Hyderabad International Airport',
    shortName: 'Hyderabad T1',
    hubType: 'airport',
    city: 'Hyderabad',
    state: 'Telangana',
    terminal: 'Terminal 1',
    isDemoData: true,
    heroImage: 'airport-terminal-5',
    galleryImages: ['pod-interior-2', 'pod-exterior-3', 'pod-desk-1', 'pod-detail-1'],
    podCount: 14,
    availablePods: 9,
    availability: 'medium',
    startingPricePerHour: 499,
    amenityIds: ['display', 'wifi', 'mattress', 'lock', 'lighting'],
    operatingHours: { opens: '00:00', closes: '23:59', is24x7: true },
    geo: { lat: 17.2403, lng: 78.4294 },
    instructions: [
      'Located beneath the signature roof structure near the central plaza.',
      'A popular stop for travellers catching up on rest between flights.',
    ],
    nearbyFacilities: [
      { label: 'Central Plaza', distanceMeters: 70, type: 'lounge' },
      { label: 'Business Lounge', distanceMeters: 110, type: 'lounge' },
    ],
    description: 'Set beneath Hyderabad\'s landmark terminal roofline, this hub gives the city\'s travellers a quiet place to rest between flights.',
    featured: false,
  },
  {
    id: 'loc-pune-rail',
    slug: 'pune-railway-station',
    name: 'Pune Railway Station',
    shortName: 'Pune Junction',
    hubType: 'railway',
    city: 'Pune',
    state: 'Maharashtra',
    isDemoData: true,
    heroImage: 'railway-hub-1',
    galleryImages: ['pod-interior-3', 'pod-exterior-1', 'pod-desk-2'],
    podCount: 8,
    availablePods: 5,
    availability: 'medium',
    startingPricePerHour: 399,
    amenityIds: ['lock', 'wifi', 'charging', 'ventilation'],
    operatingHours: { opens: '05:00', closes: '23:30', is24x7: false },
    geo: { lat: 18.5286, lng: 73.8744 },
    instructions: [
      'Sleepy1 rest pods sit on the upper concourse near Platform 1 entrance.',
      'A planned expansion location — availability is illustrative and subject to change.',
    ],
    nearbyFacilities: [
      { label: 'Platform 1 Entrance', distanceMeters: 40, type: 'transport' },
      { label: 'Waiting Hall', distanceMeters: 20, type: 'lounge' },
    ],
    description: 'Our first non-airport hub concept — bringing the same private rest standard to India\'s rail network. Shown here as planned-expansion demo data.',
    featured: false,
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
