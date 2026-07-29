import type { PodTypeDefinition, PodFeatureComparisonRow } from '@/types/pod'

export const podTypes: PodTypeDefinition[] = [
  {
    id: 'pod-solo-rest',
    type: 'solo-rest',
    name: 'Solo Rest Pod',
    tagline: 'Deep, private sleep between flights.',
    description: 'A fully enclosed single-occupancy pod engineered for uninterrupted sleep — ergonomic mattress, blackout lighting, and acoustic isolation from the terminal outside.',
    image: 'pod-interior-1',
    occupancy: 1,
    pricePerHour: 499,
    amenityIds: ['mattress', 'lighting', 'noise', 'lock', 'ventilation', 'charging'],
    bestFor: ['Overnight layovers', 'Red-eye connections', 'Jet lag recovery'],
  },
  {
    id: 'pod-solo-work',
    type: 'solo-work',
    name: 'Solo Unwind Pod',
    tagline: 'More time, more comfort, total calm.',
    description: 'A single-occupancy pod built for longer, more connected rest — an in-pod entertainment panel, dependable WiFi, and smart climate control so you can properly switch off.',
    image: 'pod-desk-1',
    occupancy: 1,
    pricePerHour: 549,
    amenityIds: ['mattress', 'display', 'wifi', 'charging', 'climate', 'lock'],
    bestFor: ['Longer rest sessions', 'Extended layovers', 'Unwinding before a flight'],
  },
  {
    id: 'pod-twin-lounge',
    type: 'twin-lounge',
    name: 'Twin Lounge Pod',
    tagline: 'Room for two, privacy for both.',
    description: 'A shared rest and lounge space for travelling companions or colleagues — two dedicated rest zones inside one private enclosure.',
    image: 'pod-interior-2',
    occupancy: 2,
    pricePerHour: 799,
    amenityIds: ['mattress', 'wifi', 'charging', 'ventilation', 'lighting', 'lock'],
    bestFor: ['Travelling pairs', 'Family layovers', 'Colleague travel'],
  },
  {
    id: 'pod-premium-suite',
    type: 'premium-suite',
    name: 'Premium Suite Pod',
    tagline: 'The full Sleepy1 experience.',
    description: 'Our largest and most private pod — premium linen, a smart entertainment panel, and priority shower access where available, for the fullest Sleepy1 rest experience.',
    image: 'pod-detail-1',
    occupancy: 1,
    pricePerHour: 999,
    amenityIds: ['mattress', 'display', 'shower', 'climate', 'housekeeping', 'lock', 'wifi'],
    bestFor: ['Long layovers', 'Business travellers', 'Special occasions'],
  },
]

export const podFeatureComparison: PodFeatureComparisonRow[] = [
  { feature: 'Occupancy', soloRest: '1 guest', soloWork: '1 guest', twinLounge: '2 guests', premiumSuite: '1 guest' },
  { feature: 'Ergonomic mattress', soloRest: true, soloWork: true, twinLounge: true, premiumSuite: true },
  { feature: 'Acoustic isolation', soloRest: true, soloWork: true, twinLounge: true, premiumSuite: true },
  { feature: 'Smart entertainment panel', soloRest: false, soloWork: true, twinLounge: false, premiumSuite: true },
  { feature: 'Smart climate control', soloRest: false, soloWork: true, twinLounge: false, premiumSuite: true },
  { feature: 'Shower access add-on', soloRest: false, soloWork: false, twinLounge: false, premiumSuite: true },
  { feature: 'Starting price / hour', soloRest: '₹499', soloWork: '₹549', twinLounge: '₹799', premiumSuite: '₹999' },
]

export function getPodTypeById(id: string): PodTypeDefinition | undefined {
  return podTypes.find((p) => p.id === id)
}
