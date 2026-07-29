<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({
  title: 'Contact & Support',
  description: 'Get in touch with Sleepy1 support — booking help, airport assistance, and general enquiries. This is a frontend-only demo contact form.',
})

const topics = [
  'Booking assistance',
  'Check-in / access issue',
  'Payments & credits',
  'Cancellation or reschedule',
  'Corporate enquiry',
  'Something else',
]

const form = reactive({ name: '', email: '', topic: topics[0], message: '' })
const errors = ref<Partial<Record<'name' | 'email' | 'message', string>>>({})
const isSubmitted = ref(false)
const isSubmitting = ref(false)

function validate() {
  const next: typeof errors.value = {}
  if (!form.name.trim()) next.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
  if (form.message.trim().length < 10) next.message = 'Please add a few more details (min. 10 characters).'
  errors.value = next
  return Object.keys(next).length === 0
}

async function submit() {
  if (!validate()) return
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 700))
  isSubmitting.value = false
  isSubmitted.value = true
}
</script>

<template>
  <div class="container-page max-w-5xl py-16">
    <SectionHeading level="h1" eyebrow="Support" title="We're here to help" description="Reach out for booking assistance, airport access questions, or anything else. This form is a frontend-only demo — no message is transmitted." />

    <div class="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div class="card-surface p-6 sm:p-8">
        <template v-if="!isSubmitted">
          <form class="space-y-5" @submit.prevent="submit">
            <FormField v-model="form.name" label="Full name" required :error="errors.name" autocomplete="name" />
            <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
            <div>
              <label for="topic" class="mb-2 block text-sm font-medium text-ivory-100/80">Topic</label>
              <select id="topic" v-model="form.topic" class="min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-ivory-50 focus:border-brand-400">
                <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
            <FormField v-model="form.message" label="Message" as="textarea" :rows="5" required :error="errors.message" />
            <PrimaryButton type="submit" :loading="isSubmitting" full-width>Send Message</PrimaryButton>
          </form>
        </template>
        <template v-else>
          <div class="flex flex-col items-center py-10 text-center">
            <span class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
            <h3 class="mt-5 text-xl font-semibold text-ivory-50">Message sent</h3>
            <p class="mt-2 max-w-sm text-sm text-ivory-100/60">Thanks for reaching out — our support team typically responds within 24 hours. (Simulated for this demo.)</p>
            <button type="button" class="mt-6 text-sm font-semibold text-brand-300 hover:text-brand-200" @click="isSubmitted = false">Send another message</button>
          </div>
        </template>
      </div>

      <div class="space-y-6">
        <div class="card-surface p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Direct Contact</h3>
          <p class="mt-3 text-sm text-ivory-100/70">Email: <a href="mailto:support@sleepy1.example" class="text-brand-300 hover:text-brand-200">support@sleepy1.example</a></p>
          <p class="mt-1 text-sm text-ivory-100/70">Phone: <a href="tel:+911800123456" class="text-brand-300 hover:text-brand-200">+91 1800-123-4567</a></p>
          <p class="mt-1 text-sm text-ivory-100/70">Hours: 24/7 for airside locations, 6 AM – Midnight elsewhere</p>
        </div>
        <div class="card-surface p-6">
          <h3 class="text-sm font-semibold uppercase tracking-wide text-ivory-100/50">Airport Assistance</h3>
          <p class="mt-3 text-sm leading-relaxed text-ivory-100/65">
            Every Sleepy1 pod cluster has an on-site help point and in-app support button during operating hours —
            look for the Sleepy1 signage near your terminal's pod cluster.
          </p>
        </div>
        <router-link to="/faq" class="card-surface flex items-center justify-between p-6 transition-colors hover:border-brand-400/40">
          <span class="text-sm font-semibold text-ivory-50">Browse FAQs first</span>
          <span class="text-brand-300">→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
