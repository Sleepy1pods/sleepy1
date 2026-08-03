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
          <stop offset="0%" stop-color="#0b0d12" />
          <stop offset="100%" stop-color="#1a1d27" />
        </linearGradient>
        <radialGradient :id="glowId" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stop-color="#7182f0" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#0b0d12" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" :fill="`url(#${gradId})`" />

      <!-- Exterior: closed pod capsule -->
      <g v-if="derivedVariant === 'exterior'">
        <rect x="0" y="0" width="400" height="300" :fill="`url(#${glowId})`" />
        <rect x="120" y="40" width="160" height="230" rx="34" fill="none" stroke="#faf6ef" stroke-opacity="0.3" stroke-width="1.5" />
        <rect x="140" y="60" width="120" height="150" rx="18" fill="#faf6ef" opacity="0.05" />
        <rect x="150" y="72" width="6" height="120" rx="3" fill="#faf6ef" opacity="0.35" />
        <circle cx="200" cy="230" r="2.5" fill="#a7b5fd" />
        <text x="200" y="255" text-anchor="middle" font-family="ui-sans-serif, sans-serif" font-size="10" fill="#faf6ef" opacity="0.4" letter-spacing="3">SLEEPY1</text>
      </g>

      <!-- Interior: bed + calm ambience -->
      <g v-else-if="derivedVariant === 'interior'">
        <rect x="0" y="0" width="400" height="300" :fill="`url(#${glowId})`" />
        <rect x="60" y="200" width="280" height="18" rx="9" fill="#0b0d12" opacity="0.4" />
        <rect x="90" y="150" width="220" height="60" rx="16" fill="#faf6ef" opacity="0.85" />
        <rect x="100" y="128" width="60" height="34" rx="10" fill="#faf6ef" opacity="0.65" />
        <rect x="30" y="60" width="4" height="140" fill="#faf6ef" opacity="0.2" />
        <rect x="366" y="60" width="4" height="140" fill="#faf6ef" opacity="0.2" />
        <circle cx="335" cy="70" r="8" fill="#faf6ef" opacity="0.3" />
      </g>

      <!-- Wind-down: in-pod entertainment panel -->
      <g v-else-if="derivedVariant === 'desk'">
        <rect x="0" y="0" width="400" height="300" :fill="`url(#${glowId})`" />
        <rect x="120" y="55" width="90" height="60" rx="10" fill="#faf6ef" opacity="0.8" />
        <rect x="128" y="63" width="74" height="44" rx="4" fill="#0b0d12" opacity="0.5" />
        <circle cx="165" cy="85" r="10" fill="#7182f0" opacity="0.45" />
        <path d="M55 215c40-28 95-28 135 0s95 28 135 0" stroke="#faf6ef" stroke-width="1.5" fill="none" opacity="0.2" />
        <rect x="90" y="230" width="220" height="14" rx="7" fill="#faf6ef" opacity="0.25" />
        <circle cx="335" cy="65" r="8" fill="#faf6ef" opacity="0.3" />
      </g>

      <!-- Detail: control / lighting close-up -->
      <g v-else>
        <rect x="40" y="40" width="320" height="220" rx="20" fill="#faf6ef" opacity="0.04" />
        <circle cx="200" cy="150" r="70" :fill="`url(#${glowId})`" />
        <rect x="170" y="110" width="60" height="80" rx="14" fill="#faf6ef" opacity="0.8" />
        <circle cx="200" cy="130" r="5" fill="#7182f0" opacity="0.85" />
        <circle cx="200" cy="150" r="5" fill="#7182f0" opacity="0.55" />
        <circle cx="200" cy="170" r="5" fill="#7182f0" opacity="0.3" />
      </g>
    </svg>
  </div>
</template>
