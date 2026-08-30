import type { NavItem } from '@/types/common'

export const primaryNav: NavItem[] = [
  { label: 'Features', to: '/pod-experience' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
  { label: 'About Us', to: '/about' },
]

export const loggedInNav: NavItem[] = [
  { label: 'My Bookings', to: '/bookings' },
]

export const footerColumns: { title: string; items: NavItem[] }[] = [
  {
    title: 'Quick Links',
    items: [
      { label: 'Features', to: '/pod-experience' },
      { label: 'Locations', to: '/locations' },
      { label: 'Contact', to: '/contact' },
      { label: 'About Us', to: '/about' },
      { label: 'How it Works', to: '/how-it-works' },
      { label: 'Newsletter', to: '/newsletter' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Terms & Conditions', to: '/legal/terms' },
      { label: 'Cancellation & Refund Policy', to: '/legal/cancellation-policy' },
      { label: 'Privacy Policy', to: '/legal/privacy-policy' },
      { label: 'Safety Guidelines', to: '/legal/safety-guidelines' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]

/** Secondary, lower-emphasis links kept discoverable in a compact footer row. */
export const footerMoreLinks: NavItem[] = [
  { label: 'Login', to: '/login' },
  { label: 'Create Account', to: '/register' },
  { label: 'My Bookings', to: '/bookings' },
  { label: 'Offers & Promotions', to: '/offers' },
  { label: 'Newsletter', to: '/newsletter' },
  { label: 'Refer & Earn', to: '/refer' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Journal', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Press & Media', to: '/press' },
  { label: 'Corporate Solutions', to: '/corporate' },
]

export const socialLinks: { label: string; href: string; icon: 'instagram' | 'linkedin' | 'youtube' }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/sleepy1.pods/', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sleepy1pods?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/@Sleepy1-d3v3u', icon: 'youtube' },
]

