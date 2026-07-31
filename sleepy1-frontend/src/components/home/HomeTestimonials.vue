<script setup lang="ts">
import { testimonials } from '@/data/testimonials'
import SectionHeading from '@/components/common/SectionHeading.vue'
import TestimonialCard from '@/components/common/TestimonialCard.vue'

const firstRow = testimonials.filter((_, index) => index % 2 === 0)
const secondRow = testimonials.filter((_, index) => index % 2 === 1)
const marqueeRows = [
  { testimonials: firstRow, direction: 'marquee-ltr', label: 'First row traveller stories' },
  { testimonials: secondRow, direction: 'marquee-rtl', label: 'Second row traveller stories' },
]
</script>

<template>
  <section class="section-pad bg-ink-900/40">
    <div class="container-page overflow-hidden">
      <SectionHeading eyebrow="Traveller Stories" title="Rest, trusted by frequent flyers" align="center" class="mx-auto" />

      <div class="mt-12 space-y-6" aria-label="Traveller testimonials">
        <div
          v-for="(row, rowIndex) in marqueeRows"
          :key="row.direction"
          class="testimonial-marquee"
          :aria-label="row.label"
        >
          <div
            class="testimonial-track flex w-max gap-6"
            :class="row.direction"
            aria-hidden="true"
          >
            <template v-for="copyIndex in 2" :key="copyIndex">
              <div
                v-for="testimonial in row.testimonials"
                :key="`${testimonial.id}-${rowIndex}-${copyIndex}`"
                class="w-[min(82vw,24rem)] shrink-0"
              >
                <TestimonialCard :testimonial="testimonial" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-marquee {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.testimonial-track {
  will-change: transform;
}

.testimonial-marquee:hover .testimonial-track {
  animation-play-state: paused;
}

.marquee-ltr {
  animation: testimonialMarqueeLtr 34s linear infinite;
}

.marquee-rtl {
  animation: testimonialMarqueeRtl 38s linear infinite;
}

@keyframes testimonialMarqueeLtr {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@keyframes testimonialMarqueeRtl {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .testimonial-track {
    animation: none;
  }
}
</style>
