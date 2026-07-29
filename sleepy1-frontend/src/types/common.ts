export interface Faq {
  id: string
  category: FaqCategory
  question: string
  answer: string
}

export type FaqCategory =
  | 'booking'
  | 'checkin'
  | 'payments'
  | 'cancellation'
  | 'safety'
  | 'hygiene'
  | 'privacy'
  | 'luggage'
  | 'airport'
  | 'facilities'

export interface Testimonial {
  id: string
  name: string
  role: string
  location: string
  quote: string
  rating: number
  avatarInitials: string
}

export interface Amenity {
  id: string
  label: string
  description: string
  icon: AmenityIcon
}

export type AmenityIcon =
  | 'wifi'
  | 'lighting'
  | 'charging'
  | 'lock'
  | 'ventilation'
  | 'mattress'
  | 'noise'
  | 'shower'
  | 'climate'
  | 'housekeeping'
  | 'display'

export interface Stat {
  id: string
  value: string
  label: string
  isVerified: boolean
}

export interface NavItem {
  label: string
  to: string
  requiresAuth?: boolean
}

export interface Address {
  line1: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  description?: string
  duration?: number
}

export interface SelectOption {
  label: string
  value: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: string
  author: string
  publishedAt: string
  readMinutes: number
  coverImage: string
}

export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: string
  description: string
}

export interface PressMention {
  id: string
  publication: string
  title: string
  date: string
  url: string
}

export interface OfferPromo {
  id: string
  code: string
  title: string
  description: string
  discountLabel: string
  validTill: string
  segment: 'new-user' | 'membership' | 'corporate' | 'seasonal'
}
