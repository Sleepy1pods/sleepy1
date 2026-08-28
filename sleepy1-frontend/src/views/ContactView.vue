<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import DreamCard from '@/components/common/DreamCard.vue'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'

usePageMeta({
  title: 'Contact & Support',
  description: 'Get in touch with Sleepy1 support.',
})

const form = reactive({ firstName: '', lastName: '', email: '', phone: '', message: '' })
const isSubmitted = ref(false)
const isSubmitting = ref(false)

async function submit() {
  isSubmitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 700))
  isSubmitting.value = false
  isSubmitted.value = true
}

function resetForm() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  isSubmitted.value = false
}
</script>

<template>
  <div class="contact-page bg-page min-h-screen">
    <div class="container-page max-w-6xl py-16 sm:py-20 lg:py-24">
      <div class="mb-10 lg:mb-12">
        <h2 class="text-4xl font-display font-bold text-primary reveal" style="--reveal-delay: 0ms">Contact Us</h2>
        <p class="mt-3 text-lg text-secondary max-w-2xl reveal" style="--reveal-delay: 50ms">We're here to help. Send us a message and our support team will get back to you as soon as possible.</p>
      </div>
      
      <div class="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        
        <!-- Form Section -->
        <div class="bg-transparent">
          
          <template v-if="!isSubmitted">
            <form class="grid sm:grid-cols-2 gap-6" @submit.prevent="submit">
              <div class="reveal sm:col-span-1" style="--reveal-delay: 100ms">
                <FormField v-model="form.firstName" label="First Name" required />
              </div>
              <div class="reveal sm:col-span-1" style="--reveal-delay: 150ms">
                <FormField v-model="form.lastName" label="Last Name" required />
              </div>
              <div class="reveal sm:col-span-2" style="--reveal-delay: 200ms">
                <FormField v-model="form.email" type="email" label="Email Address" required />
              </div>
              <div class="reveal sm:col-span-2" style="--reveal-delay: 250ms">
                <FormField v-model="form.phone" type="tel" label="Phone Number" required />
              </div>
              <div class="reveal sm:col-span-2" style="--reveal-delay: 300ms">
                <FormField v-model="form.message" as="textarea" :rows="4" label="Your Message" required />
              </div>
              <div class="reveal sm:col-span-2 flex items-center justify-start gap-4 mt-4" style="--reveal-delay: 350ms">
                <PrimaryButton type="submit" :loading="isSubmitting" class="w-full sm:w-auto">
                  Submit Message
                </PrimaryButton>
                <button type="button" @click="resetForm" class="btn-base px-6 py-3 border border-theme text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors w-full sm:w-auto">
                  Reset
                </button>
              </div>
            </form>
          </template>
          
          <template v-else>
            <div class="flex flex-col items-center justify-center py-16 text-center reveal card-surface rounded-3xl mt-4" style="--reveal-delay: 100ms">
              <span class="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-500 shadow-[0_0_0_1px_rgba(16,185,129,0.2)] mb-6 animate-fade-up">
                <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </span>
              <h3 class="text-2xl font-display font-semibold text-primary">Message Sent Successfully!</h3>
              <p class="mt-3 text-secondary max-w-md">Thank you for reaching out to Sleepy1. Our support team will get back to you shortly.</p>
              <button type="button" class="mt-8 text-sm font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 transition-colors underline underline-offset-4" @click="resetForm">
                Send another message
              </button>
            </div>
          </template>
        </div>

        <!-- Direct Contact Card -->
        <div class="grid gap-6 reveal" style="--reveal-delay: 200ms">
          <DreamCard class="support-card p-8 group hover:-translate-y-1 transition-all duration-300">
            <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500 dark:text-brand-400 mb-6 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Direct Contact
            </h3>
            
            <div class="space-y-5 text-sm leading-relaxed text-secondary">
              <div class="flex flex-col">
                <span class="text-xs uppercase tracking-wider text-muted mb-1">Email</span>
                <a href="mailto:sleepy1.pods@gmail.com" class="text-primary font-medium hover:text-brand-500 transition-colors">sleepy1.pods@gmail.com</a>
              </div>
              
              <div class="flex flex-col">
                <span class="text-xs uppercase tracking-wider text-muted mb-1">Location</span>
                <span class="text-primary font-medium">IIIT Dharwad</span>
              </div>
              
              <div class="flex flex-col">
                <span class="text-xs uppercase tracking-wider text-muted mb-1">Phone</span>
                <div class="flex flex-col gap-1">
                  <a href="tel:+919773112388" class="text-primary font-medium hover:text-brand-500 transition-colors">+91 9773112388</a>
                  <a href="tel:+919606984328" class="text-primary font-medium hover:text-brand-500 transition-colors">+91 9606984328</a>
                </div>
              </div>
              
              <div class="flex flex-col pt-4 border-t border-theme">
                <span class="text-xs uppercase tracking-wider text-muted mb-1">Operating Hours</span>
                <span class="text-primary font-medium">10:00 AM – 10:00 PM</span>
              </div>
            </div>
            
            <!-- Decorative background element -->
            <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-400/10 rounded-full blur-3xl group-hover:bg-brand-400/20 transition-colors duration-500 pointer-events-none"></div>
          </DreamCard>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  isolation: isolate;
}

.support-card {
  position: relative;
  overflow: hidden;
}

.support-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03), transparent 40%);
  opacity: 0.9;
}
</style>
