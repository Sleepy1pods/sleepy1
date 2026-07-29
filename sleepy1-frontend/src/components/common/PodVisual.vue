<script setup lang="ts">
import { computed } from 'vue'
import { seedFromId } from '@/utils/visualSeed'

const props = withDefaults(
  defineProps<{
    id?: string
    variant?: 'exterior' | 'interior' | 'desk' | 'detail'
    rounded?: string
  }>(),
  {
    id: 'pod-interior-1',
    variant: undefined,
    rounded: 'rounded-2xl',
  },
)

const derivedVariant = computed(() => {
  if (props.variant) return props.variant
  if (props.id.includes('exterior')) return 'exterior'
  if (props.id.includes('desk')) return 'desk'
  if (props.id.includes('detail')) return 'detail'
  return 'interior'
})

const seed = computed(() => seedFromId(props.id))
const hueShift = computed(() => (seed.value % 24) - 12)
const gradId = computed(() => `pod-grad-${props.id}`)
const glowId = computed(() => `pod-glow-${props.id}`)

const variantLabel: Record<string, string> = {
  exterior: 'exterior',
  interior: 'interior in rest mode',
  desk: 'wind-down entertainment corner',
  detail: 'smart control panel detail',
}
</script>

<template>
  <div :class="['relative overflow-hidden', rounded]" role="img" :aria-label="`Illustration of a Sleepy1 pod ${variantLabel[derivedVariant]}`">
    <svg viewBox="0 0 400 300" class="h-full w-full" :style="{ filter: `hue-rotate(${hueShift}deg)` }" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient :id="gradId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#12141b" />
          <stop offset="55%" stop-color="#1a1d27" />
          <stop offset="100%" stop-color="#242836" />
        </linearGradient>
        <radialGradient :id="glowId" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stop-color="#f6c98b" stop-opacity="0.85" />
          <stop offset="45%" stop-color="#a08ce0" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" :fill="`url(#${gradId})`" />

      <!-- Exterior: closed pod capsule -->
      <g v-if="derivedVariant === 'exterior'">
        <rect x="120" y="40" width="160" height="230" rx="34" fill="#e9e4da" opacity="0.08" />
        <rect x="120" y="40" width="160" height="230" rx="34" fill="none" stroke="#e9e4da" stroke-opacity="0.35" stroke-width="2" />
        <rect x="140" y="60" width="120" height="150" rx="18" :fill="`url(#${glowId})`" />
        <rect x="150" y="72" width="6" height="120" rx="3" fill="#e9e4da" opacity="0.5" />
        <circle cx="200" cy="230" r="3" fill="#a08ce0" />
        <text x="200" y="255" text-anchor="middle" font-family="ui-monospace, monospace" font-size="11" fill="#e9e4da" opacity="0.6" letter-spacing="3">SLEEPY1</text>
      </g>

      <!-- Interior: bed + warm ambience -->
      <g v-else-if="derivedVariant === 'interior'">
        <rect x="0" y="0" width="400" height="300" :fill="`url(#${glowId})`" opacity="0.9" />
        <rect x="60" y="200" width="280" height="18" rx="9" fill="#0b0d12" opacity="0.4" />
        <rect x="90" y="150" width="220" height="60" rx="16" fill="#e9e4da" opacity="0.9" />
        <rect x="100" y="128" width="60" height="34" rx="10" fill="#e9e4da" opacity="0.75" />
        <rect x="30" y="60" width="8" height="140" fill="#f6c98b" opacity="0.55" />
        <rect x="362" y="60" width="8" height="140" fill="#f6c98b" opacity="0.55" />
        <circle cx="335" cy="70" r="10" fill="#e9e4da" opacity="0.5" />
      </g>

      <!-- Wind-down: in-pod entertainment panel -->
      <g v-else-if="derivedVariant === 'desk'">
        <rect x="0" y="0" width="400" height="300" :fill="`url(#${glowId})`" opacity="0.5" />
        <rect x="120" y="55" width="90" height="60" rx="10" fill="#e9e4da" opacity="0.85" />
        <rect x="128" y="63" width="74" height="44" rx="4" fill="#0b0d12" opacity="0.5" />
        <circle cx="165" cy="85" r="13" fill="#a08ce0" opacity="0.6" />
        <path d="M55 215c40-28 95-28 135 0s95 28 135 0" stroke="#f6c98b" stroke-width="2" fill="none" opacity="0.4" />
        <rect x="90" y="230" width="220" height="16" rx="8" fill="#e9e4da" opacity="0.3" />
        <circle cx="335" cy="65" r="10" fill="#e9e4da" opacity="0.5" />
      </g>

      <!-- Detail: control / lighting close-up -->
      <g v-else>
        <rect x="40" y="40" width="320" height="220" rx="20" fill="#e9e4da" opacity="0.06" />
        <circle cx="200" cy="150" r="70" :fill="`url(#${glowId})`" />
        <rect x="170" y="110" width="60" height="80" rx="14" fill="#e9e4da" opacity="0.85" />
        <circle cx="200" cy="130" r="6" fill="#7182f0" />
        <circle cx="200" cy="150" r="6" fill="#a08ce0" />
        <circle cx="200" cy="170" r="6" fill="#f6c98b" />
      </g>

      <rect width="400" height="300" fill="url(#grain)" opacity="0" />
    </svg>
  </div>
</template>
