import type { NavItem } from '@/types/common'

export const primaryNav: NavItem[] = [
  { label: 'Locations', to: '/locations' },
  { label: 'The Sleep Pod', to: '/pod-experience' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'For Partners', to: '/corporate' },
  { label: 'Membership', to: '/membership' },
  { label: 'About', to: '/about' },
  { label: 'Support', to: '/contact' },
]

export const loggedInNav: NavItem[] = [
  { label: 'My Bookings', to: '/bookings' },
  { label: 'Wallet', to: '/wallet' },
]

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Company',
    items: [
      { label: 'About Sleepy1', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Press & Media', to: '/press' },
      { label: 'Corporate Solutions', to: '/corporate' },
      { label: 'Contact & Support', to: '/contact' },
    ],
  },
  {
    title: 'Experience',
    items: [
      { label: 'Explore Locations', to: '/locations' },
      { label: 'The Sleep Pod', to: '/pod-experience' },
      { label: 'How Booking Works', to: '/how-it-works' },
      { label: 'Membership Plans', to: '/membership' },
      { label: 'Gift Sleep Credits', to: '/gift-credits' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Login', to: '/login' },
      { label: 'Create Account', to: '/register' },
      { label: 'My Bookings', to: '/bookings' },
      { label: 'Credits Wallet', to: '/wallet' },
      { label: 'Offers & Promotions', to: '/offers' },
      { label: 'Refer & Earn', to: '/refer' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'FAQs', to: '/faq' },
      { label: 'Travel Blog', to: '/blog' },
      { label: 'Privacy Policy', to: '/legal/privacy-policy' },
      { label: 'Terms & Conditions', to: '/legal/terms' },
      { label: 'Cancellation Policy', to: '/legal/cancellation-policy' },
      { label: 'Refund Policy', to: '/legal/refund-policy' },
      { label: 'Cookie Policy', to: '/legal/cookie-policy' },
    ],
  },
]
