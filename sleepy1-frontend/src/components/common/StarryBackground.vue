<script setup lang="ts">
// 65 floating, twinkling background stars for a clean night atmosphere across all pages
const floatingStars = Array.from({ length: 65 }, (_, i) => {
  const animType = i % 3 === 0 ? 'float-star-1' : i % 3 === 1 ? 'float-star-2' : 'float-star-3'
  const isGold = i % 6 === 0
  return {
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1.5 : Math.random() < 0.9 ? 2 : 2.5,
    duration: `${5 + Math.random() * 6}s`,
    delay: `${Math.random() * 5}s`,
    animClass: animType,
    colorClass: isGold ? 'bg-gold-200' : 'bg-ivory-50',
    shadowStyle: isGold ? '0 0 8px rgba(233, 217, 174, 0.9)' : '0 0 6px rgba(255, 255, 255, 0.8)',
  }
})

// 3 rare, graceful falling stars with long pauses between them
const shootingStars = [
  { id: 1, top: '10%', left: '15%', delay: '2s', duration: '18s' },
  { id: 2, top: '20%', left: '55%', delay: '8s', duration: '18s' },
  { id: 3, top: '8%', left: '75%', delay: '14s', duration: '18s' },
]
</script>

<template>
  <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black" aria-hidden="true">
    <!-- Drifting/Moving background stars -->
    <span
      v-for="star in floatingStars"
      :key="star.id"
      class="absolute rounded-full"
      :class="[star.animClass, star.colorClass]"
      :style="{
        top: star.top,
        left: star.left,
        width: `${star.size}px`,
        height: `${star.size}px`,
        boxShadow: star.shadowStyle,
        animationDuration: star.duration,
        animationDelay: star.delay,
      }"
    />

    <!-- Falling/Shooting stars streaking across the sky -->
    <span
      v-for="shooter in shootingStars"
      :key="'shoot-' + shooter.id"
      class="shooting-star"
      :style="{
        top: shooter.top,
        left: shooter.left,
        animationDelay: shooter.delay,
        animationDuration: shooter.duration,
      }"
    />
  </div>
</template>

<style scoped>
.float-star-1 {
  animation: floatStar1 infinite ease-in-out;
}
.float-star-2 {
  animation: floatStar2 infinite ease-in-out;
}
.float-star-3 {
  animation: floatStar3 infinite ease-in-out;
}

@keyframes floatStar1 {
  0%, 100% {
    transform: translate(0px, 0px) scale(0.8);
    opacity: 0.25;
  }
  50% {
    transform: translate(24px, -24px) scale(1.3);
    opacity: 0.95;
  }
}

@keyframes floatStar2 {
  0%, 100% {
    transform: translate(0px, 0px) scale(0.9);
    opacity: 0.3;
  }
  50% {
    transform: translate(-28px, 18px) scale(1.2);
    opacity: 0.9;
  }
}

@keyframes floatStar3 {
  0%, 100% {
    transform: translate(0px, 0px) scale(0.7);
    opacity: 0.2;
  }
  50% {
    transform: translate(18px, 28px) scale(1.4);
    opacity: 1;
  }
}

.shooting-star {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,1) 100%);
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.9));
  animation: fallingStarRight infinite linear;
  opacity: 0;
  width: 0px;
}

@keyframes fallingStarRight {
  0% {
    transform: translate3d(0, 0, 0) rotate(35deg);
    opacity: 0;
    width: 0px;
  }
  5% {
    opacity: 1;
    width: 140px;
  }
  15% {
    opacity: 1;
    width: 140px;
  }
  25% {
    transform: translate3d(750px, 525px, 0) rotate(35deg);
    opacity: 0;
    width: 0px;
  }
  100% {
    transform: translate3d(750px, 525px, 0) rotate(35deg);
    opacity: 0;
    width: 0px;
  }
}
</style>
