import type { Faq, FaqCategory } from '@/types/common'

export const faqCategoryLabels: Record<FaqCategory, string> = {
  booking: 'Booking',
  checkin: 'Check-in',
  payments: 'Payments',
  cancellation: 'Cancellation',
  safety: 'Safety',
  hygiene: 'Hygiene',
  privacy: 'Privacy',
  luggage: 'Luggage',
  facilities: 'Pod Facilities',
}

export const faqs: Faq[] = [
  { id: 'f1', category: 'booking', question: 'How far in advance can I book a pod?', answer: 'You can book instantly for immediate use or up to 30 days in advance. Popular hubs and peak travel windows fill up quickly, so early booking is recommended.' },
  { id: 'f2', category: 'booking', question: 'What is the minimum and maximum booking duration?', answer: 'Bookings start at 1 hour and can be extended in 30-minute increments up to 8 hours, depending on your membership tier.' },
  { id: 'f3', category: 'booking', question: 'Can I book for someone else?', answer: 'Yes. Enter the guest\'s details during the Guest Information step and share the QR confirmation with them directly.' },
  { id: 'f4', category: 'checkin', question: 'How does smart check-in work?', answer: 'Scan the QR code from your confirmation at the pod access panel. The pod unlocks automatically for your reserved slot — no staff or key handover required.' },
  { id: 'f5', category: 'checkin', question: 'What happens if I arrive late?', answer: 'Pods are held for 15 minutes past your check-in time. After that, the slot may be released, though your remaining duration stays reserved for that stay.' },
  { id: 'f6', category: 'checkin', question: 'Do I need to check in at a desk first?', answer: 'No. Sleepy1 is fully self-service — walk directly to your assigned pod and scan your booking QR code.' },
  { id: 'f7', category: 'payments', question: 'What payment methods are supported?', answer: 'This demo supports simulated direct payment and Sleepy1 Credits, including a hybrid split between the two. No real payment processing occurs in this build.' },
  { id: 'f8', category: 'payments', question: 'Can I combine credits with a card payment?', answer: 'Yes, the checkout step lets you apply any available credit balance first, with the remaining balance charged to your selected payment method.' },
  { id: 'f9', category: 'payments', question: 'Do credits expire?', answer: 'Purchased credits are valid for 12 months from the purchase date. Promotional or gifted credits may carry shorter validity, shown in your wallet.' },
  { id: 'f10', category: 'cancellation', question: 'Can I cancel a booking?', answer: 'Yes, bookings can be cancelled from My Bookings up to 30 minutes before check-in for a full credit refund to your wallet.' },
  { id: 'f11', category: 'cancellation', question: 'Can I reschedule instead of cancelling?', answer: 'Yes, use the Reschedule option on your booking to choose a new date and time, subject to availability at that location.' },
  { id: 'f12', category: 'safety', question: 'Are pods monitored for safety?', answer: 'Common areas are monitored by hub security. Each pod features a smart lock that only responds to your unique booking QR code during your reserved window.' },
  { id: 'f13', category: 'safety', question: 'What if I need help during my stay?', answer: 'Every pod cluster has an in-app support button and an on-site help point staffed during operating hours.' },
  { id: 'f14', category: 'hygiene', question: 'How are pods cleaned between guests?', answer: 'Every pod undergoes a full housekeeping reset — fresh linen, surface sanitisation, and air exchange — before the next booking begins.' },
  { id: 'f15', category: 'hygiene', question: 'Is bedding replaced for every guest?', answer: 'Yes, linen and pillow covers are replaced after every single stay, without exception.' },
  { id: 'f16', category: 'privacy', question: 'Are pods fully enclosed?', answer: 'Yes, every Sleepy1 pod is a fully enclosed private structure — not a curtained booth or open recliner.' },
  { id: 'f17', category: 'privacy', question: 'Is there a camera inside the pod?', answer: 'No. Sleepy1 pods never install cameras or microphones inside the sleeping or resting compartment.' },
  { id: 'f18', category: 'luggage', question: 'Can I bring luggage into the pod?', answer: 'Yes, most pods include space for one large suitcase and a carry-on. Larger group luggage may require the optional locker add-on.' },
  { id: 'f19', category: 'luggage', question: 'Is there a separate locker service?', answer: 'Select locations offer locker add-ons during checkout for additional secure storage outside the pod.' },
  { id: 'f22', category: 'facilities', question: 'What is included in every pod?', answer: 'Every pod includes ambient lighting, charging ports, high-speed WiFi, a smart lock, and fresh-air ventilation as standard.' },
  { id: 'f23', category: 'facilities', question: 'Are showers available?', answer: 'Shower access is available as a paid add-on at select locations — check the amenities list on each location page.' },
]

export function getFaqsByCategory(category: FaqCategory): Faq[] {
  return faqs.filter((f) => f.category === category)
}
