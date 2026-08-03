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
  { year: '2024', title: 'Sleepy1 founded', description: 'Started with a single observation: people deserve better rest in busy public spaces.' },
  { year: '2025', title: 'First pods installed', description: 'Pilot pods launched across university campuses.' },
  { year: '2026', title: 'National network', description: 'Expanded across universities, corporate parks, hospitals, and railway stations with credit-based membership launched.' },
  { year: 'Ahead', title: 'Nationwide growth', description: 'Working to improve access across every high-footfall category, city by city.' },
]
