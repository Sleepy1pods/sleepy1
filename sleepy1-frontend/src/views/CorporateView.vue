<script setup lang="ts">
import { reactive, ref } from 'vue'
import { usePageMeta } from '@/composables/usePageMeta'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FormField from '@/components/common/FormField.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import PodVisual from '@/components/common/PodVisual.vue'

usePageMeta({
  title: 'For Partners',
  description: 'Partner with Sleepy1 — bulk credit programs for travelling teams, and a path for property owners and institutions to bring Sleepy1 sleep pods to their location.',
})

const benefits = [
  { title: 'Bulk Credit Programs', description: 'Allocate Sleepy1 Credits across your travelling workforce with centralised billing.' },
  { title: 'Priority Booking', description: 'Reserved pod availability for employees during peak travel hours.' },
  { title: 'Usage Dashboards', description: 'Track team usage and spend once backend reporting is connected.' },
  { title: 'Dedicated Support', description: 'A dedicated account contact for onboarding and on-site coordination.' },
]

const propertyPartnerTypes = [
  'Transit authorities',
  'Corporate & railway operators',
  'Hospitals & medical campuses',
  'Universities & campuses',
  'Shopping centres',
  'Commercial property owners',
  'Tourism operators',
]

const form = reactive({ company: '', contactName: '', email: '', teamSize: '', message: '' })
const isSubmitted = ref(false)

function submit() {
  isSubmitted.value = true
}
</script>

<template>
  <div>
    <section class="section-pad">
      <div class="container-page grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p class="eyebrow mb-4">For Partners</p>
          <h1 class="text-balance text-4xl font-semibold text-ivory-50 sm:text-5xl">Rest infrastructure for travelling teams and high-footfall spaces</h1>
          <p class="mt-5 max-w-lg text-lg text-ivory-100/65">
            Bring Sleepy1 credits and priority booking to a travelling workforce, or bring a Sleepy1 pod cluster to a
            space you own or manage.
          </p>
        </div>
        <div class="overflow-hidden rounded-3xl shadow-premium">
          <PodVisual id="pod-interior-2" variant="interior" class="aspect-[4/3] w-full" rounded="rounded-3xl" />
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page">
        <SectionHeading eyebrow="For Businesses" title="Built for business travel at scale" align="center" class="mx-auto" />
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="b in benefits" :key="b.title" class="card-surface p-6">
            <h3 class="font-semibold text-ivory-50">{{ b.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ b.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="container-page">
        <SectionHeading eyebrow="For Property & Institution Partners" title="Own or manage a high-footfall space?" align="center" class="mx-auto" description="A Sleepy1 pod cluster gives your visitors a useful amenity and makes better use of your available space. Space requirements and the operational model are worked out individually per property — get in touch and our team will walk you through it." />
        <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span v-for="p in propertyPartnerTypes" :key="p" class="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ivory-100/70">
            {{ p }}
          </span>
        </div>
      </div>
    </section>

    <section class="section-pad bg-ink-900/40">
      <div class="container-page max-w-2xl">
        <SectionHeading eyebrow="Get Started" title="Talk to our partnerships team" align="center" class="mx-auto" description="Whether you're allocating rest credits for a travelling team or exploring hosting a pod cluster at your property, tell us what you're looking for below." />
        <div class="card-surface mt-10 p-6 sm:p-8">
          <template v-if="!isSubmitted">
            <form class="grid gap-5 sm:grid-cols-2" @submit.prevent="submit">
              <FormField v-model="form.company" label="Company / organisation name" required />
              <FormField v-model="form.contactName" label="Contact person" required />
              <FormField v-model="form.email" label="Work email" type="email" required />
              <FormField v-model="form.teamSize" label="Approx. team size (if applicable)" />
              <div class="sm:col-span-2">
                <FormField v-model="form.message" label="Tell us about your team's travel needs, or your property/location" as="textarea" :rows="4" />
              </div>
              <PrimaryButton type="submit" full-width class="sm:col-span-2">Request a Call</PrimaryButton>
            </form>
          </template>
          <template v-else>
            <div class="py-6 text-center">
              <h3 class="text-lg font-semibold text-ivory-50">Thanks for reaching out</h3>
              <p class="mt-2 text-sm text-ivory-100/60">Our partnerships team will contact you shortly. (Simulated for this demo.)</p>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>
