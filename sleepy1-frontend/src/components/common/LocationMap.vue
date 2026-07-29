<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import L from 'leaflet'
import type { Location } from '@/types/location'

const props = withDefaults(
  defineProps<{ locations: Location[]; height?: string; interactive?: boolean }>(),
  { height: '360px', interactive: true },
)
const emit = defineEmits<{ select: [slug: string] }>()

const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
let markers: L.Marker[] = []

// Leaflet's divIcon only accepts a raw HTML string, so these hex values can't reference Tailwind
// classes — they mirror brand-400 (#8b9bfb), lavender-500 (#a08ce0), and ink-950 (#0b0d12) in tailwind.config.js.
const podIcon = L.divIcon({
  className: '',
  html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:linear-gradient(135deg,#8b9bfb,#a08ce0);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);">
           <span style="transform:rotate(45deg);color:#0b0d12;font-weight:700;font-size:12px;">S</span>
         </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

function renderMarkers() {
  if (!map) return
  markers.forEach((m) => m.remove())
  markers = props.locations.map((loc) => {
    const marker = L.marker([loc.geo.lat, loc.geo.lng], { icon: podIcon }).addTo(map!)
    marker.bindTooltip(`${loc.name}`, { direction: 'top', offset: [0, -30] })
    marker.on('click', () => emit('select', loc.slug))
    return marker
  })
}

onMounted(() => {
  if (!mapContainer.value) return
  map = L.map(mapContainer.value, {
    scrollWheelZoom: false,
    dragging: props.interactive,
    zoomControl: props.interactive,
  }).setView([21.5, 79.0], 4.4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map)

  renderMarkers()
})

watch(() => props.locations, renderMarkers)

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<template>
  <div
    ref="mapContainer"
    class="w-full overflow-hidden rounded-2xl border border-white/10 [&_.leaflet-control-attribution]:bg-ink-950/70 [&_.leaflet-control-attribution]:text-ivory-100/50"
    :style="{ height }"
    role="application"
    aria-label="Map of Sleepy1 rest pod locations"
  />
</template>
