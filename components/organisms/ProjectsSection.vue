<script setup lang="ts">
import { ref, computed } from 'vue';
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
const currentProject = computed(() => projects[currentIndex.value]);

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + projects.length) % projects.length;
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
      
      <ProjectCard :project="currentProject" :isActive="true" :index="currentIndex" />

      <!-- Controls -->
      <div class="flex flex-col-reverse md:flex-row justify-between items-center mt-8 gap-6 md:gap-0">
         <div class="flex space-x-2">
           <button 
             v-for="(_, idx) in projects"
             :key="idx"
             @click="currentIndex = idx"
             :class="['w-12 h-1 rounded transition-all duration-300', idx === currentIndex ? 'bg-brand-accentLight dark:bg-brand-neon' : 'bg-slate-300 dark:bg-slate-700']"
             :aria-label="'Ir para projeto ' + (idx + 1)"
           ></button>
         </div>
         
         <div class="flex space-x-6">
           <button 
             @click="prevSlide" 
             class="p-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-brand-accentLight dark:hover:bg-brand-neon hover:text-white dark:hover:text-brand-dark transition-colors active:scale-95"
             aria-label="Projeto anterior"
           >
             <ArrowLeft :size="28" />
           </button>
           <button 
             @click="nextSlide" 
             class="p-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-brand-accentLight dark:hover:bg-brand-neon hover:text-white dark:hover:text-brand-dark transition-colors active:scale-95"
             aria-label="Próximo projeto"
           >
             <ArrowRight :size="28" />
           </button>
         </div>
      </div>

    </div>
  </section>
</template>
