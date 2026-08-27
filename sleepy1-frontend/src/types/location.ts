import type { Amenity } from './common'

export type HubType =
  | 'corporate'
  | 'university'
  | 'institute'
  | 'railway'
  | 'bus-terminal'
  | 'mall'
  | 'business-district'
  | 'hospital'
  | 'convention-centre'
  | 'tourist'
  | 'highway-rest-stop'

export interface OperatingHours {
  opens: string
  closes: string
  is24x7: boolean
}

export interface GeoPoint {
  lat: number
  lng: number
}

export interface NearbyFacility {
  label: string
  distanceMeters: number
  type: 'gate' | 'lounge' | 'food' | 'security' | 'transport' | 'restroom'
}

export type AvailabilityLevel = 'high' | 'medium' | 'low' | 'full'

export interface Location {
  id: string
  slug: string
  name: string
  shortName: string
  hubType: HubType
  city: string
  state: string
  terminal?: string
  isDemoData: boolean
  heroImage: string
  galleryImages: string[]
  podCount: number
  availablePods: number
  availability: AvailabilityLevel
  startingPricePerHour: number
  amenityIds: string[]
  operatingHours: OperatingHours
  geo: GeoPoint
  instructions: string[]
  nearbyFacilities: NearbyFacility[]
  description: string
  featured: boolean
}

export interface LocationWithAmenities extends Location {
  amenities: Amenity[]
}
