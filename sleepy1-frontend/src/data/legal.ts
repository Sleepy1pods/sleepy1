export interface LegalSection {
  heading: string
  body: string[]
}

export const privacyPolicySections: LegalSection[] = [
  { heading: '1. Information We Collect', body: ['This placeholder outlines the categories of information Sleepy1 would collect through booking, account creation, and pod usage, including contact details, booking history, and device information.'] },
  { heading: '2. How We Use Information', body: ['Information would be used to process bookings, operate pod access systems, provide customer support, and improve the Sleepy1 service.'] },
  { heading: '3. Data Sharing', body: ['This section will describe any third parties involved in payment processing, hub partnerships, or infrastructure, once finalised.'] },
  { heading: '4. Your Rights', body: ['Travellers would have rights to access, correct, or delete their personal data, subject to applicable law in their jurisdiction.'] },
  { heading: '5. Contact', body: ['Privacy-related queries can be directed to the Sleepy1 support team listed on the Contact page.'] },
]

export const termsSections: LegalSection[] = [
  { heading: '1. Acceptance of Terms', body: ['By using Sleepy1, travellers agree to these terms, which govern booking, pod usage, and account conduct.'] },
  { heading: '2. Booking & Usage', body: ['Pods are reserved for the booked duration only. Overstaying may incur additional charges once billing integration is live.'] },
  { heading: '3. Prohibited Conduct', body: ['Damage to pod equipment, smoking, or unauthorised access attempts are prohibited and may result in booking cancellation without refund.'] },
  { heading: '4. Liability', body: ['Sleepy1\'s liability for loss of personal belongings or missed connections will be defined here following legal review.'] },
  { heading: '5. Changes to Terms', body: ['These terms may be updated periodically; continued use constitutes acceptance of the revised terms.'] },
]

export const cancellationPolicySections: LegalSection[] = [
  { heading: '1. Cancellation Window', body: ['Bookings may be cancelled up to 30 minutes before the scheduled check-in time for a full credit refund, as reflected in this MVP.'] },
  { heading: '2. Late Cancellations', body: ['Cancellations made after check-in time may not be eligible for a refund once real payment processing is implemented.'] },
  { heading: '3. No-Shows', body: ['Bookings not checked into within 15 minutes of the scheduled time may be released and treated as a no-show.'] },
  { heading: '4. Rescheduling', body: ['Guests may reschedule an upcoming booking instead of cancelling, subject to availability at the same or a different location.'] },
]

export const refundPolicySections: LegalSection[] = [
  { heading: '1. Eligible Refunds', body: ['Refunds for eligible cancellations are credited back to the Sleepy1 Credits wallet in this MVP; real payment gateway refund timelines will be defined at integration.'] },
  { heading: '2. Credit Refunds', body: ['Credits used for a cancelled booking are returned to the wallet balance and do not expire sooner than their original expiry date.'] },
  { heading: '3. Non-Refundable Items', body: ['Certain add-ons consumed during a stay (e.g. a redeemed coffee voucher) may not be refundable once redeemed.'] },
]

export const cookiePolicySections: LegalSection[] = [
  { heading: '1. Cookies We Use', body: ['This MVP uses browser localStorage and sessionStorage for demo authentication state and dismissible banners — no third-party tracking cookies are used in this build.'] },
  { heading: '2. Future Analytics', body: ['A production release may introduce analytics cookies; this policy will be updated accordingly with opt-out mechanisms.'] },
  { heading: '3. Managing Preferences', body: ['Travellers will be able to manage cookie preferences through their browser settings or an in-app consent banner in production.'] },
]
