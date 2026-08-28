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

export interface JourneyMilestone {
  year: string
  title: string
  subtitle?: string
  description: string
  badge?: string
}

export const journeyTimeline: JourneyMilestone[] = [
  {
    year: '2025',
    title: 'The Spark & Founding Sleepy1',
    subtitle: 'From Frustration to Inception',
    description: 'Born from late-night fatigue and the realization that public rest options are broken. Sketched initial cabin blueprints and assembled the core founding team.',
    badge: 'Origin',
  },
  {
    year: '2026',
    title: 'MVP Prototyping & Pilot Testing',
    subtitle: 'Real-World Validation',
    description: 'Fabricated the first physical working pods and deployed pilot units at university campuses like IIIT Dharwad, logging 10,000+ guest rest hours.',
    badge: 'Campus Pilot',
  },
  {
    year: '2026',
    title: 'Version - 1 Production',
    subtitle: 'Coming Soon',
    description: 'Version - 1 production coming soon.',
    badge: 'Coming Soon',
  },
  {
    year: '2027',
    title: 'Nationwide Expansion',
    subtitle: 'Scale & Ubiquity',
    description: 'Scaling pod network across high traffic public places.',
    badge: 'Upcoming Horizon',
  },
]

// Backward-compatible alias
export const milestones = journeyTimeline

