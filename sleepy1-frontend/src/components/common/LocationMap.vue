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

function getPodIcon(hubType: string) {
  let colors = ['#8b9bfb', '#a08ce0'];
  if (hubType === 'university' || hubType === 'institute') colors = ['#60a5fa', '#2563eb']; // Blue
  else if (hubType === 'hospital') colors = ['#4ade80', '#16a34a']; // Green
  else if (hubType === 'corporate') colors = ['#9ca3af', '#4b5563']; // Grey
  else if (hubType === 'railway') colors = ['#fb923c', '#ea580c']; // Orange
  
  return L.divIcon({
    className: '',
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:linear-gradient(135deg,${colors[0]},${colors[1]});display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);">
             <span style="transform:rotate(45deg);color:#ffffff;font-weight:700;font-size:12px;">S</span>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
}

function renderMarkers() {
  if (!map) return
  markers.forEach((m) => m.remove())
  markers = props.locations.map((loc) => {
    const marker = L.marker([loc.geo.lat, loc.geo.lng], { icon: getPodIcon(loc.hubType) }).addTo(map!)
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
