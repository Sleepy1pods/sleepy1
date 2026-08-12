export interface LegalSection {
  heading: string
  body: string[]
}

export const privacyPolicySections: LegalSection[] = [
  { heading: '1. Information We Collect', body: ['We collect the information you provide when creating an account or making a booking, including your name, email address, phone number, and payment details. We also collect booking history and device information needed to operate pod access securely.'] },
  { heading: '2. How We Use Information', body: ['Your information is used to process bookings, operate pod access systems, provide customer support, send booking confirmations, and improve the Sleepy1 service.'] },
  { heading: '3. Data Sharing', body: ['We share information only with the payment processors, hub and location partners, and infrastructure providers necessary to deliver the Sleepy1 service. We do not sell your personal data to third parties.'] },
  { heading: '4. Data Retention & Security', body: ['We retain personal data only for as long as necessary to provide our services and meet legal obligations, and we apply industry-standard safeguards to protect it against unauthorised access.'] },
  { heading: '5. Your Rights', body: ['You have the right to access, correct, or delete your personal data, subject to applicable law in your jurisdiction. Requests can be made through the Contact page.'] },
  { heading: '6. Contact', body: ['Privacy-related queries can be directed to our support team via the Contact page.'] },
]

export const termsSections: LegalSection[] = [
  { heading: '1. Acceptance of Terms', body: ['By creating an account or booking a pod with Sleepy1, you agree to these Terms & Conditions, which govern booking, pod usage, and account conduct.'] },
  { heading: '2. Booking & Usage', body: ['Pods are reserved exclusively for the booked duration. Overstaying beyond the reserved slot may incur additional charges, billed to your account or Sleepy1 Credits wallet.'] },
  { heading: '3. Prohibited Conduct', body: ['Damage to pod equipment, smoking, or unauthorised access attempts are strictly prohibited and may result in booking cancellation without refund, and restriction of future access.'] },
  { heading: '4. Liability', body: ['Sleepy1 is not liable for loss of personal belongings left in a pod, or for missed connections or appointments arising from use of the service, to the fullest extent permitted by law.'] },
  { heading: '5. Changes to Terms', body: ['These terms may be updated from time to time. Continued use of Sleepy1 after changes are published constitutes acceptance of the revised terms.'] },
]

export const cancellationPolicySections: LegalSection[] = [
  { heading: '1. Cancellation Window', body: ['Bookings can be cancelled up to 30 minutes before the scheduled check-in time for a full refund to your Sleepy1 Credits wallet.'] },
  { heading: '2. Late Cancellations', body: ['Cancellations made after the scheduled check-in time are not eligible for a refund.'] },
  { heading: '3. No-Shows', body: ['Bookings not checked into within 15 minutes of the scheduled time are released and treated as a no-show; credits for that booking are forfeited.'] },
  { heading: '4. Rescheduling', body: ['Guests may reschedule an upcoming booking instead of cancelling, subject to availability at the same or a different location.'] },
]

export const refundPolicySections: LegalSection[] = [
  { heading: '1. Eligible Refunds', body: ['Refunds for eligible cancellations are credited back to your Sleepy1 Credits wallet.'] },
  { heading: '2. Credit Refunds', body: ['Credits refunded from a cancelled booking are returned to your wallet balance and retain their original expiry date.'] },
  { heading: '3. Non-Refundable Items', body: ['Add-ons already redeemed during a stay, such as a claimed voucher, are not eligible for a refund.'] },
  { heading: '4. Processing Time', body: ['Eligible refunds are credited to your Sleepy1 Credits wallet instantly and are available for immediate use on your next booking.'] },
]

export const cookiePolicySections: LegalSection[] = [
  { heading: '1. Cookies We Use', body: ['Sleepy1 uses browser localStorage and sessionStorage to keep you signed in and to remember your preferences. We do not use third-party advertising or tracking cookies.'] },
  { heading: '2. Essential Storage', body: ['The storage used by Sleepy1 is essential to the functioning of the service, including authentication and booking flows, and cannot be disabled without affecting core functionality.'] },
  { heading: '3. Managing Preferences', body: ['You can clear or manage locally stored data at any time through your browser settings.'] },
]
