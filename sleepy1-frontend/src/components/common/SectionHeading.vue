<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

const revealTarget = useScrollReveal()
void revealTarget // bound via `ref="revealTarget"` below — read here so TS doesn't flag it as unused

withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
    level?: 'h1' | 'h2' | 'h3'
  }>(),
  {
    eyebrow: undefined,
    description: undefined,
    align: 'left',
    tone: 'light',
    level: 'h2',
  },
)
</script>

<template>
  <div ref="revealTarget" class="opacity-0" :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</p>
    <component
      :is="level"
      :class="[
        'text-3xl sm:text-4xl lg:text-5xl font-semibold text-balance leading-[1.1]',
        tone === 'light' ? 'text-ivory-50' : 'text-ink-950',
      ]"
    >
      {{ title }}
    </component>
    <p
      v-if="description"
      :class="[
        'mt-5 text-base sm:text-lg leading-relaxed',
        tone === 'light' ? 'text-ivory-100/70' : 'text-ink-800/70',
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>
