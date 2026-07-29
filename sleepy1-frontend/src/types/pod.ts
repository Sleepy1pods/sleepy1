export type PodType = 'solo-rest' | 'solo-work' | 'twin-lounge' | 'premium-suite'

export interface PodTypeDefinition {
  id: string
  type: PodType
  name: string
  tagline: string
  description: string
  image: string
  occupancy: number
  pricePerHour: number
  amenityIds: string[]
  bestFor: string[]
}

export interface PodUnit {
  id: string
  locationId: string
  podTypeId: string
  code: string
  isAvailable: boolean
}

export interface PodFeatureComparisonRow {
  feature: string
  soloRest: boolean | string
  soloWork: boolean | string
  twinLounge: boolean | string
  premiumSuite: boolean | string
}
