<script setup lang="ts">
import { reactive, ref } from 'vue'
import { creditPackages } from '@/data/credits'
import { useUiStore } from '@/stores/ui'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import PaymentSuccess from '@/components/booking/PaymentSuccess.vue'

usePageMeta({
  title: 'Gift Sleep Credits',
  description: 'Send Sleepy1 Credits as a gift to a fellow traveller — a thoughtful gift for someone about to fly.',
})

const ui = useUiStore()
const selectedPackageId = ref(creditPackages[1].id)
const form = reactive({ recipientName: '', recipientEmail: '', note: '' })
const showSuccess = ref(false)

function sendGift() {
  if (!form.recipientEmail.trim()) {
    ui.pushToast({ type: 'error', title: 'Recipient email required' })
    return
  }
  showSuccess.value = true
}
</script>

<template>
  <div class="container-page max-w-3xl py-16">
    <SectionHeading level="h1" eyebrow="Gift Sleep Credits" title="Send rest to someone who needs it" align="center" class="mx-auto" description="Gift Sleepy1 Credits to a friend, colleague, or family member ahead of their next trip." />

    <div class="card-surface mt-10 p-6 sm:p-8">
      <p class="mb-3 text-sm font-medium text-ivory-100/70">Choose a credit pack</p>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          v-for="pack in creditPackages"
          :key="pack.id"
          type="button"
          class="rounded-xl border px-4 py-3 text-center transition-colors"
          :class="selectedPackageId === pack.id ? 'border-brand-400 bg-brand-400/15 text-brand-200' : 'border-white/10 text-ivory-100/70 hover:border-white/25'"
          :aria-pressed="selectedPackageId === pack.id"
          @click="selectedPackageId = pack.id"
        >
          <p class="font-semibold">{{ pack.credits }}</p>
          <p class="text-xs text-ivory-100/50">₹{{ pack.priceInr }}</p>
        </button>
      </div>

      <form class="mt-8 grid gap-5 sm:grid-cols-2" @submit.prevent="sendGift">
        <FormField v-model="form.recipientName" label="Recipient name" required />
        <FormField v-model="form.recipientEmail" label="Recipient email" type="email" required />
        <div class="sm:col-span-2">
          <FormField v-model="form.note" label="Personal note (optional)" as="textarea" :rows="3" />
        </div>
        <PrimaryButton type="submit" full-width class="sm:col-span-2">Send Gift Credits</PrimaryButton>
      </form>
    </div>

    <ModalDialog :open="showSuccess" title="Gift Sent" @close="showSuccess = false">
      <PaymentSuccess />
      <p class="text-center text-sm text-ivory-100/60">{{ form.recipientName || 'Your recipient' }} will be notified with instructions to redeem their credits. (Simulated for this demo.)</p>
      <PrimaryButton full-width class="mt-4" @click="showSuccess = false">Done</PrimaryButton>
    </ModalDialog>
  </div>
</template>
