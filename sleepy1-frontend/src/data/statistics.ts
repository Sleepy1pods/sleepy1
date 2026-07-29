import type { Stat } from '@/types/common'

/**
 * Statistics shown across marketing pages.
 * `isVerified: false` values are illustrative MVP placeholders and must be
 * replaced with confirmed business figures before production launch.
 */
export const heroStats: Stat[] = [
  { id: 's1', value: '5+', label: 'Airport Locations', isVerified: true },
  { id: 's2', value: '24/7', label: 'Accessibility', isVerified: true },
  { id: 's3', value: '₹499', label: 'Starting Price / Hour', isVerified: true },
  { id: 's4', value: '100%', label: 'Privacy Focused', isVerified: true },
]

export const impactStats: Stat[] = [
  { id: 'i1', value: '40,000+', label: 'Rest hours booked', isVerified: false },
  { id: 'i2', value: '12,000+', label: 'Travellers served', isVerified: false },
  { id: 'i3', value: '4.8/5', label: 'Average guest rating', isVerified: false },
  { id: 'i4', value: '<60s', label: 'Average check-in time', isVerified: true },
]

export const milestones: { year: string; title: string; description: string }[] = [
  { year: '2024', title: 'Sleepy1 founded', description: 'Started with a single observation: travellers deserve better than airport chairs.' },
  { year: '2025', title: 'First pods installed', description: 'Pilot pods launched at two Indian metro airports.' },
  { year: '2026', title: 'Network expansion', description: 'Expanded to 5+ airport hubs with credit-based membership launched.' },
  { year: 'Ahead', title: 'Beyond airports', description: 'Working to expand into railway stations, hospitals, campuses, and other high-footfall locations.' },
]
