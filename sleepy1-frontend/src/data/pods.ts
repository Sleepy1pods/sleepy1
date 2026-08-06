import type { PodTypeDefinition, PodFeatureComparisonRow } from '@/types/pod'

export const podTypes: PodTypeDefinition[] = [
  {
    id: 'pod-solo-rest',
    type: 'solo-rest',
    name: 'Solo Rest Pod',
    tagline: 'Deep, private sleep, whenever you need it.',
    description: 'A fully enclosed single-occupancy pod engineered for uninterrupted sleep — ergonomic mattress, blackout lighting, and acoustic isolation from the world outside.',
    image: 'pod-interior-1',
    occupancy: 1,
    pricePerHour: 499,
    amenityIds: ['mattress', 'lighting', 'noise', 'lock', 'ventilation', 'charging'],
    bestFor: ['Long shifts', 'Late-night stays', 'Recovery between commitments'],
  }
]

export const podFeatureComparison: PodFeatureComparisonRow[] = [
  { feature: 'Occupancy', soloRest: '1 guest', soloWork: '-', twinLounge: '-', premiumSuite: '-' },
  { feature: 'Ergonomic mattress', soloRest: true, soloWork: false, twinLounge: false, premiumSuite: false },
  { feature: 'Acoustic isolation', soloRest: true, soloWork: false, twinLounge: false, premiumSuite: false },
  { feature: 'Smart entertainment panel', soloRest: false, soloWork: false, twinLounge: false, premiumSuite: false },
  { feature: 'Smart climate control', soloRest: false, soloWork: false, twinLounge: false, premiumSuite: false },
  { feature: 'Shower access add-on', soloRest: false, soloWork: false, twinLounge: false, premiumSuite: false },
  { feature: 'Starting price / hour', soloRest: '₹499', soloWork: '-', twinLounge: '-', premiumSuite: '-' },
]

export function getPodTypeById(id: string): PodTypeDefinition | undefined {
  return podTypes.find((p) => p.id === id)
}
