import type { Location } from '@/types/location'

/**
 * DEMO DATA NOTICE
 * All location records below are illustrative MVP content for the Sleepy1 frontend.
 * `isDemoData: true` marks records whose operational status, pod counts, live availability,
 * exact pricing, and map coordinates should be confirmed before production launch.
 */
export const locations: Location[] = [
  {
    id: 'loc-iiit-dharwad',
    slug: 'iiit-dharwad',
    name: 'IIIT Dharwad',
    localizedName: {
      en: 'IIIT Dharwad',
      te: 'ఐఐఐటీ ధార్వాడ్',
      kn: 'ಐಐಐಟಿ ಧಾರವಾಡ',
      hi: 'ट्रिपल आईटी धारवाड़',
    },
    shortName: 'IIITD',
    hubType: 'institute',
    city: 'Dharwad',
    state: 'Karnataka',
    terminal: 'Main Campus',
    isDemoData: false,
    heroImage: '/iiit_dharwad.png',
    galleryImages: ['/iiit_dharwad.png'],
    podCount: 1,
    availablePods: 1,
    availability: 'low',
    startingPricePerHour: 0,
    amenityIds: ['wifi', 'charging', 'mattress'],
    operatingHours: { opens: '10:00', closes: '22:00', is24x7: false },
    geo: { lat: 15.3930, lng: 75.0236 },
    instructions: ['Located near the main academic block.'],
    nearbyFacilities: [{ label: 'Cafeteria', distanceMeters: 50, type: 'food' }],
    description: 'Rest pods for students and faculty at IIIT Dharwad.',
    featured: true,
  }
]

export const locationMap: Record<string, Location> = Object.fromEntries(
  locations.map((l) => [l.slug, l]),
)

export function getLocationBySlug(slug: string): Location | undefined {
  return locationMap[slug]
}

export function getLocationName(loc: Location, locale?: string): string {
  if (locale && loc.localizedName && loc.localizedName[locale as 'en' | 'te' | 'kn' | 'hi']) {
    return loc.localizedName[locale as 'en' | 'te' | 'kn' | 'hi']!
  }
  return loc.name
}

export function getFeaturedLocations(): Location[] {
  return locations.filter((l) => l.featured)
}

export const cities: string[] = Array.from(new Set(locations.map((l) => l.city))).sort()
