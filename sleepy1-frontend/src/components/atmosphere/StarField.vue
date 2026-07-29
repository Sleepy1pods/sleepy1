<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useReducedMotion } from '@/composables/useReducedMotion'

/**
 * Canvas 2D star field: tiny twinkling stars, slow dust drift, and an occasional shooting star.
 * Deliberately not WebGL/Three.js — a 2D canvas with ~60-180 circles is imperceptibly cheap and
 * needs no fallback path. Freezes to a single static frame under `prefers-reduced-motion`, and
 * pauses its render loop whenever the tab is hidden or the canvas leaves the viewport.
 */
const props = withDefaults(defineProps<{ density?: 'low' | 'medium' | 'high'; shootingStars?: boolean }>(), {
  density: 'medium',
  shootingStars: true,
})

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  amplitude: number
  speed: number
  phase: number
  driftX: number
  driftY: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  angle: number
  progress: number
  speed: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const prefersReducedMotion = useReducedMotion()

let ctx: CanvasRenderingContext2D | null = null
let stars: Star[] = []
let shootingStar: ShootingStar | null = null
let width = 0
let height = 0
let dpr = 1
let frame = 0
let lastTime = 0
let nextShootingStarAt = 0
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let isInView = true
let isRunning = false

const densityMap = { low: 45, medium: 90, high: 150 }

function seedStars() {
  const area = width * height
  const target = Math.round((area / (1920 * 1080)) * densityMap[props.density])
  const count = Math.max(24, Math.min(densityMap.high, target))
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.3 + 0.3,
    baseOpacity: Math.random() * 0.5 + 0.25,
    amplitude: Math.random() * 0.35 + 0.15,
    speed: Math.random() * 0.6 + 0.2,
    phase: Math.random() * Math.PI * 2,
    driftX: (Math.random() - 0.5) * 0.006,
    driftY: (Math.random() - 0.5) * 0.004,
  }))
}

function maybeSpawnShootingStar(now: number) {
  if (!props.shootingStars || shootingStar || now < nextShootingStarAt) return
  shootingStar = {
    x: Math.random() * width * 0.6,
    y: Math.random() * height * 0.35,
    length: Math.random() * 90 + 70,
    angle: (Math.random() * 20 + 25) * (Math.PI / 180),
    progress: 0,
    speed: Math.random() * 0.6 + 0.9,
  }
  nextShootingStarAt = now + Math.random() * 14000 + 9000
}

function drawStaticFrame() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#faf6ef'
  for (const star of stars) {
    ctx.globalAlpha = star.baseOpacity
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1
}

function render(now: number) {
  if (!ctx) return
  const dt = lastTime ? now - lastTime : 16
  lastTime = now
  ctx.clearRect(0, 0, width, height)

  ctx.fillStyle = '#faf6ef'
  for (const star of stars) {
    star.x = (star.x + star.driftX * dt + width) % width
    star.y = (star.y + star.driftY * dt + height) % height
    const twinkle = Math.sin(now * 0.001 * star.speed + star.phase) * star.amplitude
    ctx.globalAlpha = Math.max(0, Math.min(1, star.baseOpacity + twinkle))
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  maybeSpawnShootingStar(now)
  if (shootingStar) {
    shootingStar.progress += dt * 0.001 * shootingStar.speed
    if (shootingStar.progress >= 1) {
      shootingStar = null
    } else {
      const s = shootingStar
      const travel = s.progress * (width * 0.5 + s.length)
      const headX = s.x + Math.cos(s.angle) * travel
      const headY = s.y + Math.sin(s.angle) * travel
      const tailX = headX - Math.cos(s.angle) * s.length
      const tailY = headY - Math.sin(s.angle) * s.length
      const fade = s.progress < 0.15 ? s.progress / 0.15 : 1 - (s.progress - 0.15) / 0.85
      const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY)
      gradient.addColorStop(0, 'rgba(250,246,239,0)')
      gradient.addColorStop(1, `rgba(250,246,239,${Math.max(0, fade * 0.85)})`)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(tailX, tailY)
      ctx.lineTo(headX, headY)
      ctx.stroke()
    }
  }

  if (isRunning) frame = requestAnimationFrame(render)
}

function startLoop() {
  if (isRunning || prefersReducedMotion.value || !isInView) return
  isRunning = true
  lastTime = 0
  frame = requestAnimationFrame(render)
}

function stopLoop() {
  isRunning = false
  cancelAnimationFrame(frame)
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = Math.max(1, Math.round(rect.width))
  height = Math.max(1, Math.round(rect.height))
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  seedStars()
  if (prefersReducedMotion.value) drawStaticFrame()
}

function handleVisibility() {
  if (document.hidden) stopLoop()
  else startLoop()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()

  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(canvas)

  if (typeof IntersectionObserver !== 'undefined') {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        isInView = entries[0]?.isIntersecting ?? true
        if (isInView) startLoop()
        else stopLoop()
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)
  }

  document.addEventListener('visibilitychange', handleVisibility)

  if (prefersReducedMotion.value) drawStaticFrame()
  else startLoop()
})

onUnmounted(() => {
  stopLoop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <canvas ref="canvasRef" class="block h-full w-full" aria-hidden="true" />
</template>
