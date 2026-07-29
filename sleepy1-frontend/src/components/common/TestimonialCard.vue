<script setup lang="ts">
import type { Testimonial } from '@/types/common'

defineProps<{ testimonial: Testimonial }>()
</script>

<template>
  <figure class="card-surface flex h-full flex-col p-7">
    <div class="mb-4 flex gap-1 text-amber-300" aria-hidden="true">
      <svg v-for="i in 5" :key="i" class="h-4 w-4" :class="i <= testimonial.rating ? 'opacity-100' : 'opacity-20'" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
      </svg>
    </div>
    <blockquote class="flex-1 text-[15px] leading-relaxed text-ivory-100/80">"{{ testimonial.quote }}"</blockquote>
    <figcaption class="mt-6 flex items-center gap-3">
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-lavender-500 text-sm font-semibold text-ink-950">
        {{ testimonial.avatarInitials }}
      </span>
      <div>
        <p class="text-sm font-semibold text-ivory-50">{{ testimonial.name }}</p>
        <p class="text-xs text-ivory-100/50">{{ testimonial.role }} · {{ testimonial.location }}</p>
      </div>
    </figcaption>
  </figure>
</template>
