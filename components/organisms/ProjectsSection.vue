<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import ProjectCard from '../molecules/ProjectCard.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import type { Project } from '../../types';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import rodoanPreview from '@/assets/images/rodoan-new.png';
import semearPreview from '@/assets/images/semear-preview.png';
import ecoEnergiaPreview from '@/assets/images/ecoenergia-new.png';
import techpointPreview from '@/assets/images/techpoint-preview.png';
import meuBairroPreview from '@/assets/images/meu-bairro-preview.png';
import itSolutionPreview from '@/assets/images/itsolution-preview.png';

const { elementRef, isVisible } = useIntersectionObserver(0.15);

const projects: Project[] = [
  {
    id: 1,
    title: 'IT Solution E-Shop',
    category: 'Projeto Principal • Full Stack',
    description: 'Sistema completo de e-commerce para laboratório de odontologia digital. Inclui autenticação, dashboard administrativo com Kanban (CAD/CAM, Acabamento, Expedição), integração com IA generativa (Gemini/Genkit) para automações, e envio de emails transacionais. Deploy em Firebase App Hosting.',
    tags: ['Next.js 15', 'Firebase', 'Genkit AI', 'TypeScript'],
    repoUrl: 'https://github.com/pedro-psilva/studio',
    demoUrl: 'https://e-shop-itsolution.com.br/',
    image: itSolutionPreview
  },
  {
    id: 2,
    title: 'Rodoan',
    category: 'Projeto Real',
    description: 'Landing page corporativa desenvolvida para a Rodoan Logística. O projeto focou em elevar a presença digital da marca com um design premium e responsivo, garantindo alta performance e SEO otimizado para atrair novos clientes corporativos.',
    tags: ['HTML5', 'CSS3', 'TypeScript', 'JavaScript'],
    repoUrl: 'https://github.com/pedro-psilva/site-rodoan',
    demoUrl: 'https://rodoan.com.br/',
    image: rodoanPreview
  },
  {
    id: 3,
    title: 'Instituto Semear',
    category: 'Projeto de Estudo',
    description: 'Portal institucional moderno projetado para uma escola infantil. A aplicação oferece uma experiência de navegação acolhedora e intuitiva para pais e alunos, utilizando as melhores práticas de UI/UX com Tailwind CSS e a rapidez do Vite.',
    tags: ['TypeScript', 'Tailwind CSS', 'Vite', 'HTML5'],
    repoUrl: 'https://github.com/pedro-psilva/Sistema-Semear---Website-Institucional',
    demoUrl: 'https://instsemear.netlify.app/',
    image: semearPreview
  },
  {
    id: 4,
    title: 'EcoEnergia',
    category: 'Projeto Acadêmico - UPX 3',
    description: 'Plataforma gamificada de educação ambiental. Além de simuladores de consumo e ranking de usuários, integra um Chatbot inteligente com IA para tirar dúvidas sobre energias renováveis, tornando o aprendizado dinâmico e envolvente.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase'],
    repoUrl: 'https://github.com/pedro-psilva/EcoEnergia',
    demoUrl: 'https://upx3.netlify.app/',
    image: ecoEnergiaPreview
  },
  {
    id: 5,
    title: 'Techpoint',
    category: 'Projeto Acadêmico',
    description: 'E-commerce Full Stack robusto para eletrônicos. Apresenta fluxo completo de vendas: desde catálogo e carrinho até checkout real integrado com APIs de pagamento (Stripe/MercadoPago). Desenvolvido em Python com arquitetura MVC.',
    tags: ['Python', 'Flask', 'Jinja2', 'Stripe'],
    repoUrl: 'https://github.com/pedro-psilva/techpoint',
    demoUrl: 'https://techpoint-1.onrender.com/',
    image: techpointPreview
  },
  {
    id: 6,
    title: 'Meu Bairro Melhor',
    category: 'Projeto Acadêmico - UPX 4',
    description: 'Solução de Civic Tech para engajamento comunitário. Permite aos cidadãos propor melhorias geolocalizadas em um mapa interativo (Leaflet) e acompanhar o status das demandas através de dashboards visuais com Chart.js.',
    tags: ['Python', 'Flask', 'Leaflet.js', 'Chart.js'],
    repoUrl: 'https://github.com/pedro-psilva/upx4',
    demoUrl: 'https://github.com/pedro-psilva/upx4',
    image: meuBairroPreview
  }
];

const currentIndex = ref(0);
const isTransitioning = ref(false);
const currentProject = computed(() => projects[currentIndex.value]);

// Preload all project images on mount for smoother transitions
const preloadedImages = ref<HTMLImageElement[]>([]);

onMounted(() => {
  projects.forEach((project) => {
    const img = new Image();
    img.src = project.image as string;
    preloadedImages.value.push(img);
  });
});

const changeSlide = (newIndex: number) => {
  if (isTransitioning.value || newIndex === currentIndex.value) return;
  
  isTransitioning.value = true;
  
  // Short delay for fade-out animation, then change
  setTimeout(() => {
    currentIndex.value = newIndex;
    // Allow time for image to render before fading in
    setTimeout(() => {
      isTransitioning.value = false;
    }, 100);
  }, 200);
};

const nextSlide = () => {
  const newIndex = (currentIndex.value + 1) % projects.length;
  changeSlide(newIndex);
};

const prevSlide = () => {
  const newIndex = (currentIndex.value - 1 + projects.length) % projects.length;
  changeSlide(newIndex);
};

const goToSlide = (idx: number) => {
  changeSlide(idx);
};

// Touch / Swipe Logic
const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX;
  handleSwipe();
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
</script>

<template>
  <section 
    id="projetos" 
    ref="elementRef"
    :class="[
      'py-20 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <SectionTitle title="Projetos em Destaque" subtitle="Projetos pessoais e trabalhos freelancer que desenvolvi." />
    
    <div 
      class="mt-10 relative max-w-7xl mx-auto"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <!-- Project Card with smooth transition -->
      <div 
        :class="[
          'transition-all duration-300 ease-in-out',
          isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
        ]"
      >
        <ProjectCard :project="currentProject" :isActive="true" :index="currentIndex" />
      </div>

      <!-- Controls - Reorganized for mobile -->
      <div class="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 gap-4 md:gap-0">
         <!-- Navigation arrows - First on mobile -->
         <div class="flex space-x-4 md:space-x-6 order-first md:order-last">
           <button 
             @click="prevSlide" 
             :disabled="isTransitioning"
             class="p-3 md:p-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-brand-accentLight dark:hover:bg-brand-neon hover:text-white dark:hover:text-brand-dark transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
             aria-label="Projeto anterior"
           >
             <ArrowLeft :size="24" class="md:w-7 md:h-7" />
           </button>
           <button 
             @click="nextSlide" 
             :disabled="isTransitioning"
             class="p-3 md:p-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-brand-accentLight dark:hover:bg-brand-neon hover:text-white dark:hover:text-brand-dark transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
             aria-label="Próximo projeto"
           >
             <ArrowRight :size="24" class="md:w-7 md:h-7" />
           </button>
         </div>

         <!-- Dot indicators -->
         <div class="flex space-x-2 order-last md:order-first">
           <button 
             v-for="(_, idx) in projects"
             :key="idx"
             @click="goToSlide(idx)"
             :disabled="isTransitioning"
             :class="[
               'h-1.5 md:h-1 rounded transition-all duration-300 disabled:cursor-not-allowed',
               idx === currentIndex 
                 ? 'w-8 md:w-12 bg-brand-accentLight dark:bg-brand-neon' 
                 : 'w-4 md:w-12 bg-slate-300 dark:bg-slate-700 hover:bg-brand-accentLight/50'
             ]"
             :aria-label="'Ir para projeto ' + (idx + 1)"
           ></button>
         </div>
      </div>

      <!-- Swipe hint for mobile -->
      <p class="md:hidden text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
        Deslize para navegar
      </p>

    </div>
  </section>
</template>
