import type { Stat } from '@/types/common'

/**
 * Statistics shown across marketing pages.
 * `isVerified: false` values are illustrative MVP placeholders and must be
 * replaced with confirmed business figures before production launch.
 */
export const impactStats: Stat[] = [
  { id: 'i1', value: '40,000+', label: 'Rest hours booked', isVerified: false },
  { id: 'i2', value: '12,000+', label: 'Guests served', isVerified: false },
  { id: 'i3', value: '4.8/5', label: 'Average guest rating', isVerified: false },
  { id: 'i4', value: '<60s', label: 'Average check-in time', isVerified: true },
]

export const milestones: { year: string; title: string; description: string }[] = [
  { year: '2025', title: 'Sleepy1 founded', description: 'Started with a single observation: people deserve better rest in busy public spaces.' },
  { year: '2026', title: 'MVP developed and pilot testing', description: 'Pilot pods designed, developed, and tested across initial locations.' },
  { year: '2026', title: 'Final product development', description: 'Refined engineering, acoustic insulation, and smart booking features for scale.' },
  { year: '2027', title: 'Pods installed and nationwide growth', description: 'Expanding across universities, corporate parks, hospitals, and railway stations nationwide.' },
]
