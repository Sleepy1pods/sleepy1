<script setup lang="ts">
import { faqs } from '@/data/faqs'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import SecondaryButton from '@/components/common/SecondaryButton.vue'

const preview = faqs.slice(0, 5)
</script>

<template>
  <section class="section-pad">
    <div class="container-page max-w-3xl">
      <SectionHeading eyebrow="Good To Know" title="Frequently asked questions" align="center" class="mx-auto" />
      <div class="mt-10">
        <FAQAccordion :items="preview" />
      </div>
      <div class="mt-8 flex justify-center">
        <SecondaryButton as="RouterLink" to="/faq">View All FAQs →</SecondaryButton>
      </div>
    </div>
  </section>
</template>
