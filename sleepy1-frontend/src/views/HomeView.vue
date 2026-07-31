<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeTrustedStrip from '@/components/home/HomeTrustedStrip.vue'
import HomeWhySleepy1 from '@/components/home/HomeWhySleepy1.vue'
import HomePromoVideo from '@/components/home/HomePromoVideo.vue'
import HomeUseCases from '@/components/home/HomeUseCases.vue'
import HomePodExperience from '@/components/home/HomePodExperience.vue'
import HomeHowItWorks from '@/components/home/HomeHowItWorks.vue'
import HomeLocationsPreview from '@/components/home/HomeLocationsPreview.vue'
import HomeBookingDemo from '@/components/home/HomeBookingDemo.vue'
import HomeMembershipCredits from '@/components/home/HomeMembershipCredits.vue'
import HomeTestimonials from '@/components/home/HomeTestimonials.vue'
import HomeSafety from '@/components/home/HomeSafety.vue'
import HomeAppShowcase from '@/components/home/HomeAppShowcase.vue'
import HomePartnersGrid from '@/components/home/HomePartnersGrid.vue'
import HomePartnerCta from '@/components/home/HomePartnerCta.vue'
import HomeFaqPreview from '@/components/home/HomeFaqPreview.vue'
import HomeFinalCta from '@/components/home/HomeFinalCta.vue'

usePageMeta({
  title: 'Premium Sleep Pods For Rest, Wherever You Wait',
  description: 'Sleepy1 places private, hotel-grade sleep pods inside airports today, with a growing network planned for stations, hospitals, campuses, and other high-footfall locations. Book by the hour to rest and recharge.',
})
</script>

<template>
  <div>
    <HomeHero />
    <HomeTrustedStrip />
    <HomeWhySleepy1 />
    <HomePromoVideo />
    <HomeUseCases />
    <HomePodExperience />
    <HomeHowItWorks />
    <HomeLocationsPreview />
    <HomeBookingDemo />
    <HomeMembershipCredits />
    <HomeTestimonials />
    <HomeSafety />
    <HomeAppShowcase />
    <HomePartnersGrid />
    <HomePartnerCta />
    <HomeFaqPreview />
    <HomeFinalCta />
  </div>
</template>
