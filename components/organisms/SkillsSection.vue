<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import SkillItem from '../molecules/SkillItem.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import type { Skill } from '../../types';
import { Monitor, Server, Database, Wrench, Cloud, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const { elementRef, isVisible } = useIntersectionObserver(0.15);
const activeIndex = ref(0);
let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

interface SkillGroup {
  title: string;
  icon: any;
  description: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: Monitor,
    description: 'Frameworks, bibliotecas e ferramentas de UI.',
    skills: [
      { name: 'React', level: 'Bom', category: 'code' },
      { name: 'Next.js', level: 'Bom', category: 'code' },
      { name: 'TypeScript', level: 'Bom', category: 'code' },
      { name: 'Tailwind CSS', level: 'Bom', category: 'code' },
      { name: 'Vite', level: 'Bom', category: 'code' },
      { name: 'Vue.js', level: 'Básico', category: 'code' },
      { name: 'Chart.js', level: 'Bom', category: 'code' },
      { name: 'Recharts', level: 'Básico', category: 'code' },
    ]
  },
  {
    title: 'Backend',
    icon: Server,
    description: 'Linguagens, frameworks e APIs.',
    skills: [
      { name: 'Python', level: 'Bom', category: 'code' },
      { name: 'Flask', level: 'Bom', category: 'code' },
      { name: 'Node.js', level: 'Básico', category: 'code' },
      { name: 'Java', level: 'Básico', category: 'code' },
      { name: 'APIs', level: 'Básico', category: 'code' },
      { name: 'Genkit (AI)', level: 'Básico', category: 'code' },
    ]
  },
  {
    title: 'Banco de Dados',
    icon: Database,
    description: 'Bancos relacionais e BaaS.',
    skills: [
      { name: 'SQL (MySQL)', level: 'Bom', category: 'data' },
      { name: 'SQLite', level: 'Bom', category: 'data' },
      { name: 'Firestore', level: 'Bom', category: 'data' },
      { name: 'Supabase', level: 'Bom', category: 'data' },
    ]
  },
  {
    title: 'Deploy & Hosting',
    icon: Cloud,
    description: 'Plataformas de hospedagem.',
    skills: [
      { name: 'Firebase Hosting', level: 'Bom', category: 'infra' },
      { name: 'Netlify', level: 'Bom', category: 'infra' },
      { name: 'Vercel', level: 'Básico', category: 'infra' },
      { name: 'Railway', level: 'Básico', category: 'infra' },
      { name: 'Render', level: 'Básico', category: 'infra' },
      { name: 'DigitalOcean', level: 'Básico', category: 'infra' },
    ]
  },
  {
    title: 'Ferramentas',
    icon: Wrench,
    description: 'Versionamento, containers e automação.',
    skills: [
      { name: 'Git', level: 'Bom', category: 'tools' },
      { name: 'Github', level: 'Bom', category: 'tools' },
      { name: 'Docker', level: 'Básico', category: 'tools' },
      { name: 'Bubble.io', level: 'Bom', category: 'tools' },
      { name: 'n8n', level: 'Bom', category: 'tools' },
    ]
  }
];

const nextSlide = () => {
  activeIndex.value = (activeIndex.value + 1) % skillGroups.length;
};

const prevSlide = () => {
  activeIndex.value = (activeIndex.value - 1 + skillGroups.length) % skillGroups.length;
};

const setSlide = (index: number) => {
  activeIndex.value = index;
};

const startAutoPlay = () => {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 5000);
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
};

// Touch / Swipe Logic for mobile
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX;
  stopAutoPlay();
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
  startAutoPlay();
};

const handleSwipe = () => {
  const threshold = 50; // Minimum distance for swipe
  if (touchStartX.value - touchEndX.value > threshold) {
    nextSlide(); // Swiped left -> Next
  }
  if (touchEndX.value - touchStartX.value > threshold) {
    prevSlide(); // Swiped right -> Prev
  }
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});

// 3D Calculation Logic
const getCardStyle = (index: number) => {
  const total = skillGroups.length;
  // Calculate relative position based on active index
  // We want indices to be like: -1 (prev), 0 (active), 1 (next), 2 (back)
  // But we need to handle wrapping correctly first
  
  let relativeIndex = (index - activeIndex.value);
  
  // Clean up relative index to be closest path (e.g. 0 -> 3 should be -1, not 3)
  if (relativeIndex > total / 2) relativeIndex -= total;
  if (relativeIndex < -total / 2) relativeIndex += total;

  const isActive = relativeIndex === 0;
  const isNext = relativeIndex === 1; // Direct next
  const isPrev = relativeIndex === -1; // Direct prev
  // Special case for 4 items: index 2 vs -2 is same "back" item. 
  // Let's force index 2 to be "Next Next" visually or just "Back".
  const isBack = Math.abs(relativeIndex) >= 2;

  let style = {
    transform: '',
    zIndex: 0,
    opacity: 0,
    filter: 'blur(0px)',
    pointerEvents: isActive ? 'auto' : 'none',
  };

  if (isActive) {
    style.transform = 'translateX(0) scale(1) translateZ(0)';
    style.zIndex = 30;
    style.opacity = 1;
    style.filter = 'none';
  } else if (isNext) {
    style.transform = 'translateX(60%) scale(0.85) translateZ(-100px) rotateY(-15deg)';
    style.zIndex = 20;
    style.opacity = 0.7;
    style.filter = 'blur(1px)';
    style.pointerEvents = 'auto'; // allow clicking next
  } else if (isPrev) {
    style.transform = 'translateX(-60%) scale(0.85) translateZ(-100px) rotateY(15deg)';
    style.zIndex = 20;
    style.opacity = 0.7;
    style.filter = 'blur(1px)';
    style.pointerEvents = 'auto'; // allow clicking prev
  } else if (isBack) {
    style.transform = 'translateX(0) scale(0.7) translateZ(-200px)';
    style.zIndex = 10;
    style.opacity = 0; // Hide the back one fully to avoid "cutting" issues cleanly
  }

  return style;
};

</script>

<template>
  <section 
    id="skills" 
    ref="elementRef"
    :class="[
      'py-20 bg-slate-50/50 dark:bg-slate-900/20 transition-all duration-1000 overflow-hidden',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <SectionTitle title="Stack Tecnológica" subtitle="Minhas ferramentas organizadas por área de atuação." />
      
      <div 
        class="relative mt-6 h-[520px] md:h-[620px] flex items-start justify-center perspective-1000"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <!-- Nav Buttons - Hidden on mobile, shown on desktop -->
        <button 
          @click="prevSlide"
          class="hidden md:block absolute left-0 md:-left-4 xl:-left-12 z-40 top-[310px] -translate-y-1/2 p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon hover:scale-110 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft :size="32" />
        </button>
        <button 
          @click="nextSlide"
          class="hidden md:block absolute right-0 md:-right-4 xl:-right-12 z-40 top-[310px] -translate-y-1/2 p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon hover:scale-110 transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight :size="32" />
        </button>

        <!-- 3D Card Container -->
        <div class="relative w-full max-w-lg h-full flex items-start justify-center pt-0">
            <div 
              v-for="(group, index) in skillGroups"
              :key="group.title"
              class="absolute w-full top-0 transition-all duration-700 ease-out preserve-3d cursor-pointer"
              :style="getCardStyle(index) as any"
              @click="setSlide(index)"
            >
              <div 
                class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden h-[480px] md:h-[600px] flex flex-col"
              >
                <!-- Card Header -->
                <div class="p-6 md:p-8 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                  <div class="flex items-center space-x-4">
                    <div class="p-3 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl text-brand-secondary">
                      <component :is="group.icon" :size="32" />
                    </div>
                    <div>
                      <h3 class="font-bold text-xl text-slate-900 dark:text-white">{{ group.title }}</h3>
                      <p class="text-sm text-slate-500 dark:text-slate-400">{{ group.description }}</p>
                    </div>
                  </div>
                </div>

                <!-- Skills List with scroll for overflow -->
                <div class="p-6 md:p-8 bg-white dark:bg-slate-800 flex-1 overflow-hidden flex flex-col">
                  <div class="space-y-4 overflow-y-auto flex-1 pr-2 scrollbar-thin">
                    <SkillItem v-for="skill in group.skills" :key="skill.name" :skill="skill" />
                  </div>
                  <!-- Scroll indicator for cards with many items -->
                  <div v-if="group.skills.length > 6" class="text-center text-xs text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-700 mt-3">
                    ↓ Role para ver mais
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <!-- Controls section - arrows + indicators together on mobile -->
      <div class="flex flex-col items-center gap-4 mt-4 md:mt-6">
        <!-- Mobile nav buttons -->
        <div class="flex md:hidden items-center justify-center gap-6">
          <button 
            @click="prevSlide"
            class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft :size="28" />
          </button>
          <button 
            @click="nextSlide"
            class="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight :size="28" />
          </button>
        </div>

        <!-- Dot indicators -->
        <div class="flex justify-center space-x-3">
          <button 
            v-for="(_, index) in skillGroups" 
            :key="index"
            @click="setSlide(index)"
            :class="[
              'h-1.5 rounded-full transition-all duration-300',
              activeIndex === index 
                ? 'w-8 bg-brand-secondary' 
                : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-brand-accentLight'
            ]"
          ></button>
        </div>

        <!-- Swipe hint for mobile -->
        <p class="md:hidden text-xs text-slate-400 dark:text-slate-500 text-center">
          Deslize para navegar
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
</style>
