<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import DreamCard from '@/components/common/DreamCard.vue'

usePageMeta({
  title: 'Contact & Support',
  description: 'Get in touch with Sleepy1 support — booking help, location assistance, and general enquiries. This is a frontend-only demo contact form.',
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
  <div class="contact-page">
    <div class="container-page max-w-6xl py-16 sm:py-20 lg:py-24">
      <div class="max-w-2xl">
        <SectionHeading
          level="h1"
          eyebrow="Support"
          title="We're here to help"
          description="Reach out for booking assistance, location access questions, or anything else. This form is a frontend-only demo — no message is transmitted."
        />
      </div>

      <div class="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(340px,0.82fr)] xl:items-start">
        <DreamCard class="support-panel p-6 sm:p-8">
          <div class="flex flex-wrap items-end justify-between gap-4 border-b border-white/8 pb-6">
            <div>
              <p class="eyebrow">Support request</p>
              <h2 class="mt-3 text-xl font-semibold text-ivory-50">Tell us what you need</h2>
              <p class="mt-2 max-w-xl text-sm leading-relaxed text-ivory-100/60">
                The details below help route your request to the right support queue and keep the response focused.
              </p>
            </div>
            <div class="support-badge hidden shrink-0 rounded-2xl border border-brand-300/20 bg-brand-400/10 px-4 py-3 text-right md:block">
              <p class="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-200/80">Typical response</p>
              <p class="mt-1 text-sm font-semibold text-ivory-50">Within 24 hours</p>
            </div>
          </div>

          <template v-if="!isSubmitted">
            <form class="mt-6 grid gap-5 sm:grid-cols-2" @submit.prevent="submit">
              <div class="sm:col-span-1">
                <FormField v-model="form.name" label="Full name" required :error="errors.name" autocomplete="name" />
              </div>
              <div class="sm:col-span-1">
                <FormField v-model="form.email" label="Email" type="email" required :error="errors.email" autocomplete="email" />
              </div>
              <div class="sm:col-span-2">
                <label for="topic" class="mb-2 block text-sm font-medium text-ivory-100/80">Topic</label>
                <select id="topic" v-model="form.topic" class="support-select min-h-[44px] w-full rounded-xl border border-white/10 bg-ink-800/70 px-4 py-3 text-ivory-50 transition-colors focus:border-brand-400">
                  <option v-for="t in topics" :key="t" :value="t">{{ t }}</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <FormField v-model="form.message" label="Message" as="textarea" :rows="6" required :error="errors.message" />
              </div>
              <div class="sm:col-span-2 pt-1">
                <PrimaryButton type="submit" :loading="isSubmitting" full-width>Send Message</PrimaryButton>
              </div>
            </form>
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center py-12 text-center sm:py-16">
              <span class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 shadow-[0_0_0_1px_rgba(74,222,128,0.15)]">
                <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <h3 class="mt-5 text-xl font-semibold text-ivory-50">Message sent</h3>
              <p class="mt-2 max-w-sm text-sm leading-relaxed text-ivory-100/60">Thanks for reaching out — our support team typically responds within 24 hours. (Simulated for this demo.)</p>
              <button type="button" class="mt-6 text-sm font-semibold text-brand-300 transition-colors hover:text-brand-200" @click="isSubmitted = false">Send another message</button>
            </div>
          </template>
        </DreamCard>

        <div class="grid gap-5">
          <DreamCard class="support-card p-6 sm:p-7">
            <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-ivory-100/50">Direct Contact</h3>
            <div class="mt-4 space-y-2 text-sm leading-relaxed text-ivory-100/72">
              <p>Email: <a href="mailto:support@sleepy1.example" class="text-brand-300 transition-colors hover:text-brand-200">support@sleepy1.example</a></p>
              <p>Phone: <a href="tel:+911800123456" class="text-brand-300 transition-colors hover:text-brand-200">+91 1800-123-4567</a></p>
              <p>Hours: 24/7 for airside locations, 6 AM – Midnight elsewhere</p>
            </div>
          </DreamCard>

          <DreamCard class="support-card p-6 sm:p-7">
            <h3 class="text-sm font-semibold uppercase tracking-[0.18em] text-ivory-100/50">Location Assistance</h3>
            <p class="mt-4 text-sm leading-relaxed text-ivory-100/65">
              Every Sleepy1 pod cluster has an on-site help point and in-app support button during operating hours — look for the Sleepy1 signage near your terminal's pod cluster.
            </p>
          </DreamCard>

          <router-link to="/faq" class="group support-cta card-surface flex items-center justify-between gap-4 p-6 transition-all hover:border-brand-400/40">
            <span>
              <span class="block text-xs font-semibold uppercase tracking-[0.18em] text-brand-300/80">Need faster answers?</span>
              <span class="mt-2 block text-sm font-semibold text-ivory-50">Browse FAQs first</span>
            </span>
            <span class="flex h-10 w-10 items-center justify-center rounded-full border border-brand-300/20 bg-brand-400/10 text-brand-200 transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  isolation: isolate;
}

.support-panel,
.support-card,
.support-cta {
  position: relative;
  overflow: hidden;
}

.support-panel::before,
.support-card::before,
.support-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 35%);
  opacity: 0.9;
}

.support-select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, rgba(225, 231, 255, 0.65) 50%),
    linear-gradient(135deg, rgba(225, 231, 255, 0.65) 50%, transparent 50%);
  background-position:
    calc(100% - 20px) 50%,
    calc(100% - 14px) 50%;
  background-size:
    6px 6px,
    6px 6px;
  background-repeat: no-repeat;
}

@media (min-width: 1280px) {
  .support-card {
    min-height: 168px;
  }
}
</style>
