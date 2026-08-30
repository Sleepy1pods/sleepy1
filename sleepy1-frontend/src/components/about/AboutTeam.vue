<script setup lang="ts">
import { ref, computed } from 'vue'

interface TeamMember {
  id: string
  name: string
  role: string
  category: 'leadership' | 'engineering' | 'design_ops'
  tagline: string
  bio: string
  focus: string[]
  initials: string
  avatarBg: string
  links: {
    linkedin?: string
    github?: string
    email?: string
    twitter?: string
  }
}

const activeFilter = ref<'all' | 'leadership' | 'engineering' | 'design_ops'>('all')

const teamMembers: TeamMember[] = [
  {
    id: 'sukruth-hs',
    name: 'Sukruth H S',
    role: 'Co-Founder & Team Lead',
    category: 'leadership',
    tagline: 'Spearheading team execution and turning the vision of accessible rest pods into reality.',
    bio: 'Co-founded Sleepy1 and leads overall team direction, strategic partnerships, project execution, and product rollout across public hubs and academic institutions.',
    focus: ['Team Leadership', 'Product Strategy', 'Execution & Operations'],
    initials: 'SH',
    avatarBg: 'from-brand-400 via-indigo-500 to-brand-600',
    links: {
      linkedin: 'https://www.linkedin.com/in/sukruth-h-s-175370380',
    }
  },
  {
    id: 'rupesh-sai-sundhar',
    name: 'V V Rupesh Sai Sundhar',
    role: 'Co-Founder & Design and Strategy',
    category: 'leadership',
    tagline: 'Crafting human-centric rest environments and long-term brand strategy.',
    bio: 'Co-founded Sleepy1 to reimagine micro-rest. Drives core industrial design aesthetics, user experience architecture, spatial ergonomics, and strategic growth.',
    focus: ['Design & Ergonomics', 'Brand Strategy', 'Spatial Experience'],
    initials: 'RS',
    avatarBg: 'from-amber-400 via-orange-500 to-rose-600',
    links: {
      linkedin: 'https://www.linkedin.com/in/rupesh-sai-sundhar-v-v-924b57363',
    }
  },
  {
    id: 'thanish-kumar',
    name: 'Bandi Thanish Kumar',
    role: 'CTO & Hardware and Electronics',
    category: 'engineering',
    tagline: 'Architecting intelligent embedded hardware and IoT pod infrastructure.',
    bio: 'Leads hardware engineering, micro-climate controls, electrical systems, power distribution, and edge IoT microcontroller integration powering every smart pod.',
    focus: ['Hardware Engineering', 'Embedded Systems', 'IoT Architecture'],
    initials: 'TK',
    avatarBg: 'from-emerald-400 via-teal-500 to-cyan-600',
    links: {
      linkedin: 'https://www.linkedin.com/in/thanish-kumar-ba7464380',
    }
  },
]

const filteredMembers = computed(() => {
  if (activeFilter.value === 'all') return teamMembers
  return teamMembers.filter(m => m.category === activeFilter.value)
})
</script>

<template>
  <div class="mt-8">
    <!-- Header Paragraph Description -->
    <div class="mx-auto max-w-3xl text-center">
      
      <h2 class="mt-4 font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
        The minds behind the sleep revolution
      </h2>
      <p class="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
        We are a multidisciplinary crew of aerospace engineers, industrial designers, IoT developers, and hospitality veterans on a mission to democratize quality rest everywhere you wait.
      </p>

      <!-- Category Filter Pills -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          @click="activeFilter = 'all'"
          class="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          :class="[
            activeFilter === 'all'
              ? 'bg-cta-fill text-cta-text shadow-md font-bold'
              : 'border border-theme bg-surface text-secondary hover:text-primary'
          ]"
        >
          All Founders ({{ teamMembers.length }})
        </button>
        <button
          type="button"
          @click="activeFilter = 'leadership'"
          class="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          :class="[
            activeFilter === 'leadership'
              ? 'bg-cta-fill text-cta-text shadow-md font-bold'
              : 'border border-theme bg-surface text-secondary hover:text-primary'
          ]"
        >
          Leadership & Strategy
        </button>
        <button
          type="button"
          @click="activeFilter = 'engineering'"
          class="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
          :class="[
            activeFilter === 'engineering'
              ? 'bg-cta-fill text-cta-text shadow-md font-bold'
              : 'border border-theme bg-surface text-secondary hover:text-primary'
          ]"
        >
          Hardware & Tech
        </button>
      </div>
    </div>

    <!-- Team Cards Grid -->
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="card-surface group relative flex flex-col justify-between overflow-hidden p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 sm:p-7"
      >
        <div>
          <!-- Avatar Icon Badge with Gradient -->
          <div class="flex items-center justify-between">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-md text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105"
              :class="member.avatarBg"
            >
              {{ member.initials }}
            </div>
          </div>

          <!-- Name & Role -->
          <div class="mt-6">
            <h3 class="font-display text-xl font-bold text-primary">
              {{ member.name }}
            </h3>
            <p class="mt-1 text-xs font-semibold text-secondary">
              {{ member.role }}
            </p>
            <p class="mt-2.5 text-xs italic leading-relaxed text-muted">
              "{{ member.tagline }}"
            </p>
          </div>

          <!-- Bio -->
          <p class="mt-4 text-xs leading-relaxed text-secondary">
            {{ member.bio }}
          </p>

          <!-- Focus Tags -->
          <div class="mt-5 flex flex-wrap gap-1.5">
            <span
              v-for="f in member.focus"
              :key="f"
              class="rounded-md border border-theme bg-surface px-2 py-0.5 text-[10px] font-medium text-secondary"
            >
              {{ f }}
            </span>
          </div>
        </div>

        <!-- Card Footer with LinkedIn link only -->
        <div class="mt-6 flex items-center justify-between border-t border-theme pt-4 text-xs">
          <span class="text-[11px] font-medium text-muted">Connect</span>
          <div class="flex items-center gap-3 text-secondary">
            <a
              v-if="member.links.linkedin"
              :href="member.links.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="transition-colors hover:text-primary flex items-center justify-center p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="LinkedIn Profile"
            >
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.66 1.66 0 0 0-1.66-1.66Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
