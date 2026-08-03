import type { NavItem } from '@/types/common'

export const primaryNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Locations', to: '/locations' },
  { label: 'Features', to: '/pod-experience' },
  { label: 'Sleepy1 Credits', to: '/credits' },
  { label: 'Contact', to: '/contact' },
]

export const loggedInNav: NavItem[] = [
  { label: 'My Bookings', to: '/bookings' },
  { label: 'Wallet', to: '/wallet' },
]

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Quick Links',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Locations', to: '/locations' },
      { label: 'Features', to: '/pod-experience' },
      { label: 'How it Works', to: '/how-it-works' },
      { label: 'Sleepy1 Credits', to: '/credits' },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy Policy', to: '/legal/privacy-policy' },
      { label: 'Terms & Conditions', to: '/legal/terms' },
      { label: 'Cancellation Policy', to: '/legal/cancellation-policy' },
      { label: 'Refund Policy', to: '/legal/refund-policy' },
      { label: 'Cookie Policy', to: '/legal/cookie-policy' },
    ],
  },
]

/** Secondary, lower-emphasis links kept discoverable in a compact footer row. */
export const footerMoreLinks: NavItem[] = [
  { label: 'Login', to: '/login' },
  { label: 'Create Account', to: '/register' },
  { label: 'My Bookings', to: '/bookings' },
  { label: 'Credits Wallet', to: '/wallet' },
  { label: 'Membership', to: '/membership' },
  { label: 'Gift Sleep Credits', to: '/gift-credits' },
  { label: 'Offers & Promotions', to: '/offers' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'Refer & Earn', to: '/refer' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Journal', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Press & Media', to: '/press' },
  { label: 'Corporate Solutions', to: '/corporate' },
]

export const socialLinks: { label: string; href: string; icon: 'instagram' | 'linkedin' | 'x' }[] = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'X (Twitter)', href: '#', icon: 'x' },
]
