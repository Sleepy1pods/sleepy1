<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { locationService } from '@/services/locationService'
import { getAmenitiesByIds } from '@/data/amenities'
import { getFaqsByCategory } from '@/data/faqs'
import { usePageMeta } from '@/composables/usePageMeta'
import { useStructuredData } from '@/composables/useStructuredData'
import type { Location } from '@/types/location'
import type { GalleryImage } from '@/types/common'
import LocationHero from '@/components/locations/LocationHero.vue'
import NearbyFacilities from '@/components/locations/NearbyFacilities.vue'
import AmenityItem from '@/components/common/AmenityItem.vue'
import ImageGallery from '@/components/common/ImageGallery.vue'
import FAQAccordion from '@/components/common/FAQAccordion.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue'
import EmptyState from '@/components/common/EmptyState.vue'

const route = useRoute()
const location = ref<Location | undefined>()
const isLoading = ref(true)

watchEffect(async () => {
  isLoading.value = true
  location.value = await locationService.getBySlug(route.params.slug as string)
  isLoading.value = false
})

usePageMeta(() => ({
  title: location.value ? location.value.name : 'Location',
  description: location.value?.description ?? 'Sleepy1 rest pod location details, amenities, and booking information.',
}))

useStructuredData(() =>
  location.value
    ? {
        '@type': 'LodgingBusiness',
        name: location.value.name,
        description: location.value.description,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.value.city,
          addressRegion: location.value.state,
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: location.value.geo.lat,
          longitude: location.value.geo.lng,
        },
        priceRange: `₹${location.value.startingPricePerHour}+ per hour`,
      }
    : null,
)

const amenities = computed(() => (location.value ? getAmenitiesByIds(location.value.amenityIds) : []))
const gallery = computed<GalleryImage[]>(() =>
  (location.value?.galleryImages ?? []).map((src, i) => ({ id: `${src}-${i}`, src, alt: `${location.value?.name} pod gallery image ${i + 1}` })),
)
const airportFaqs = computed(() => getFaqsByCategory('airport').slice(0, 4))
</script>

<template>
  <LoadingSkeleton v-if="isLoading" :count="1" class="container-page py-16" />
  <EmptyState
    v-else-if="!location"
    title="Location not found"
    description="This Sleepy1 location may have been renamed or is not yet live."
    action-label="Browse All Locations"
    class="container-page py-24"
  />
  <div v-else>
    <LocationHero :location="location" />

    <div class="container-page grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr]">
      <div class="space-y-14">
        <section>
          <h2 class="text-xl font-semibold text-ivory-50">About This Location</h2>
          <p class="mt-3 leading-relaxed text-ivory-100/65">{{ location.description }}</p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-ivory-50">Amenities</h2>
          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <AmenityItem v-for="a in amenities" :key="a.id" :amenity="a" compact />
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-ivory-50">Pod Gallery</h2>
          <div class="mt-5">
            <ImageGallery :images="gallery" />
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-ivory-50">Traveller Instructions</h2>
          <ol class="mt-5 space-y-3">
            <li v-for="(instruction, i) in location.instructions" :key="i" class="flex gap-3 text-sm leading-relaxed text-ivory-100/65">
              <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-xs font-semibold text-brand-300">{{ i + 1 }}</span>
              {{ instruction }}
            </li>
          </ol>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-ivory-50">Nearby Facilities</h2>
          <div class="mt-5">
            <NearbyFacilities :facilities="location.nearbyFacilities" />
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-ivory-50">Frequently Asked Questions</h2>
          <div class="mt-5">
            <FAQAccordion :items="airportFaqs" />
          </div>
        </section>
      </div>

      <aside class="h-fit space-y-6 lg:sticky lg:top-24">
        <div class="card-surface p-6">
          <p class="text-sm text-ivory-100/50">Starting from</p>
          <p class="mt-1 text-3xl font-semibold text-ivory-50">₹{{ location.startingPricePerHour }}<span class="text-base font-normal text-ivory-100/50">/hr</span></p>
          <dl class="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
            <div class="flex justify-between"><dt class="text-ivory-100/60">Pods available</dt><dd class="text-ivory-50">{{ location.availablePods }} / {{ location.podCount }}</dd></div>
            <div class="flex justify-between"><dt class="text-ivory-100/60">Hours</dt><dd class="text-ivory-50">{{ location.operatingHours.is24x7 ? '24/7' : `${location.operatingHours.opens} – ${location.operatingHours.closes}` }}</dd></div>
            <div class="flex justify-between"><dt class="text-ivory-100/60">Hub type</dt><dd class="capitalize text-ivory-50">{{ location.hubType.replace('-', ' ') }}</dd></div>
          </dl>
          <PrimaryButton as="RouterLink" :to="`/book?location=${location.slug}`" full-width class="mt-6">Book This Pod</PrimaryButton>
        </div>
      </aside>
    </div>
  </div>
</template>
