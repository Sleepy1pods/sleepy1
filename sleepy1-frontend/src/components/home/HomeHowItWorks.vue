<script setup lang="ts">
import SectionHeading from '@/components/common/SectionHeading.vue'
import PrimaryButton from '@/components/common/PrimaryButton.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const steps = [
  { title: 'Choose Your Pod', description: 'Search by location, pick a pod type, and select your date, check-in time, and duration.', scene: 'location' },
  { title: 'Smart Check-in', description: 'Walk up and scan your booking QR at the pod access panel — no desk, no keys, no waiting.', scene: 'checkin' },
  { title: 'Rest & Recharge', description: 'Enjoy your private pod, then check out automatically when your reserved time ends.', scene: 'rest' },
]

const revealTargets = steps.map((_, i) => useScrollReveal(0.15, i * 120))
</script>

<template>
  <section class="section-pad">
    <div class="container-page">
      <SectionHeading eyebrow="Booking Guide" title="How Sleepy1 booking works" align="center" class="mx-auto" />
      <div class="mt-14 grid gap-8 md:grid-cols-3">
        <article v-for="(step, i) in steps" :key="step.title" :ref="(el) => { if (el) revealTargets[i].value = el as HTMLElement }" class="group">
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-premium">
            <div :class="['photo-scene absolute inset-0', `scene-${step.scene}`]" aria-hidden="true">
              <div class="photo-backdrop" />
              <div class="photo-glass" />
              <div class="photo-pod" />
              <div class="photo-person person-one" />
              <div class="photo-person person-two" />
              <div class="photo-highlight" />
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
            <span class="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-ivory-50 text-sm font-bold text-ink-950 shadow-soft">
              {{ i + 1 }}
            </span>
            <p class="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">
              {{ step.title }}
            </p>
          </div>
          <h3 class="mt-6 text-lg font-semibold text-ivory-50">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-ivory-100/60">{{ step.description }}</p>
        </article>
      </div>
      <div class="mt-12 flex justify-center">
        <PrimaryButton as="RouterLink" to="/how-it-works" size="lg">See The Full Booking Guide</PrimaryButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.photo-scene {
  transform: scale(1.01);
  transition: transform 700ms ease, filter 700ms ease;
}

.group:hover .photo-scene {
  transform: scale(1.05);
  filter: saturate(1.08) contrast(1.05);
}

.photo-backdrop {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255,255,255,0.16), transparent 34%),
    linear-gradient(110deg, rgba(191,230,238,0.24), transparent 42%),
    linear-gradient(145deg, #20273a 0%, #0a0d14 58%, #17121f 100%);
}

.photo-backdrop::before {
  content: '';
  position: absolute;
  inset: 12% -12% auto -12%;
  height: 46%;
  background: repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 1px, transparent 1px 74px);
  opacity: 0.32;
  transform: perspective(280px) rotateX(58deg);
  transform-origin: top;
}

.photo-glass {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44%;
  background:
    linear-gradient(180deg, transparent, rgba(255,255,255,0.08)),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.13) 0 2px, transparent 2px 82px);
  opacity: 0.7;
}

.photo-pod {
  position: absolute;
  right: 12%;
  bottom: 14%;
  width: 38%;
  height: 42%;
  border-radius: 28px 28px 18px 18px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.86), rgba(175,177,184,0.78)),
    linear-gradient(180deg, rgba(139,155,251,0.28), transparent);
  box-shadow: 0 28px 70px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.55);
}

.photo-pod::after {
  content: '';
  position: absolute;
  inset: 17% 22%;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(7,8,11,0.78), rgba(18,20,27,0.92));
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
}

.photo-person {
  position: absolute;
  bottom: 13%;
  width: 10px;
  height: 34px;
  border-radius: 999px;
  background: #e9e4da;
  opacity: 0.72;
}

.photo-person::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -10px;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #f6c98b;
  transform: translateX(-50%);
}

.person-one {
  left: 16%;
}

.person-two {
  left: 25%;
  transform: scale(0.78);
  opacity: 0.44;
}

.photo-highlight {
  position: absolute;
  inset: auto 10% 8% 10%;
  height: 36%;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(139,155,251,0.2), transparent 70%);
  filter: blur(10px);
}

.scene-checkin .photo-backdrop {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.18), transparent 36%),
    linear-gradient(135deg, #25314a 0%, #0b0d12 56%, #2b2540 100%);
}

.scene-checkin .photo-pod {
  left: 50%;
  right: auto;
  bottom: 13%;
  width: 32%;
  transform: translateX(-50%);
}

.scene-checkin .photo-pod::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  width: 46px;
  height: 46px;
  border-radius: 14px;
  background:
    linear-gradient(90deg, rgba(11,13,18,0.9) 0 8px, transparent 8px 14px, rgba(11,13,18,0.9) 14px 22px),
    linear-gradient(180deg, #f7f4ee, #d7d1c6);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transform: translate(-50%, -50%);
}

.scene-checkin .person-one {
  left: 18%;
}

.scene-checkin .person-two {
  left: 76%;
}

.scene-rest .photo-backdrop {
  background:
    linear-gradient(180deg, rgba(255,255,255,0.12), transparent 40%),
    radial-gradient(circle at 75% 28%, rgba(191,230,238,0.22), transparent 34%),
    linear-gradient(145deg, #161925 0%, #08090d 56%, #181321 100%);
}

.scene-rest .photo-pod {
  left: 12%;
  right: auto;
  bottom: 13%;
  width: 58%;
  height: 38%;
  border-radius: 30px;
}

.scene-rest .photo-pod::after {
  inset: 22% 14%;
}

.scene-rest .person-one,
.scene-rest .person-two {
  display: none;
}
</style>
