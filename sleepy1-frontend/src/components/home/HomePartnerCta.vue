<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import DreamBackground from '@/components/atmosphere/DreamBackground.vue'

const partnerTypes = [
  'Transit authorities',
  'Airport & railway operators',
  'Hospitals & medical campuses',
  'Universities & campuses',
  'Shopping centres',
  'Commercial property owners',
  'Tourism operators',
]
</script>

<template>
  <section class="relative overflow-hidden section-pad">
    <div class="absolute inset-0 z-0">
      <DreamBackground tone="depth" density="low" :shooting-stars="false" />
    </div>
    <div class="container-page relative z-10">
      <div class="card-surface mx-auto max-w-4xl p-8 text-center sm:p-12">
        <SectionHeading
          eyebrow="For Property & Institution Partners"
          title="Bring Sleepy1 to Your Location"
          align="center"
          class="mx-auto"
          description="Own or manage a high-footfall space? A Sleepy1 pod cluster can give your visitors a useful amenity and make better use of your available space."
        />
        <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span v-for="p in partnerTypes" :key="p" class="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ivory-100/70">
            {{ p }}
          </span>
        </div>
        <div class="mt-8 flex justify-center">
          <PrimaryButton as="RouterLink" to="/corporate" size="lg">Bring Sleepy1 to Your Location →</PrimaryButton>
        </div>
      </div>
    </div>
  </section>
</template>
