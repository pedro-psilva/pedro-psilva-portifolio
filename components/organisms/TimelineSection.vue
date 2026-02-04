<script setup lang="ts">
import SectionTitle from '../atoms/SectionTitle.vue';
import TimelineItem from '../molecules/TimelineItem.vue';
import CourseCard from '../molecules/CourseCard.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import type { EducationItem } from '../../types';

const { elementRef, isVisible } = useIntersectionObserver(0.15);

const experienceData: EducationItem[] = [
  {
    id: 1,
    year: '2024 - Presente',
    title: 'Desenvolvedor Trainee',
    institution: 'IEBT Innovation',
    description: 'Responsável pelo gerenciamento da infraestrutura e integrante do time de desenvolvimento do Cognit AI. Atuo na criação e manutenção de aplicações web, criação de agentes de IA, além de desenvolver soluções e automações (com e sem o uso de agentes de IA) atendendo demandas internas da empresa.',
    tags: ['Frontend', 'Backend', 'Python', 'Automação', 'IA']
  },
  {
    id: 2,
    year: '2021 - 2024',
    title: 'Faturista',
    institution: 'Hospital Evangélico',
    description: 'Gestão de processos de faturamento hospitalar, análise de contas médicas e suporte administrativo em setor de alta demanda, desenvolvendo organização e atenção aos detalhes.',
    tags: ['Administrativo', 'Faturamento', 'Processos']
  }
];

const educationData: EducationItem[] = [
  {
    id: 3,
    year: '2024 - 2026',
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'Centro Universitário Newton Paiva',
    description: 'Formação superior focada em engenharia de software, com formatura prevista para o segundo semestre de 2026.',
    tags: ['Ensino Superior', 'Desenvolvimento', 'Software']
  },
  {
    id: 4,
    year: '2026',
    title: 'Complete Vue & Vuex & JavaScript Mastery',
    institution: 'Online Course',
    description: 'Especialização avançada no ecossistema Vue.js com desenvolvimento de projetos reais.',
    tags: ['Vue.js', 'Vuex', 'JavaScript']
  },
  {
    id: 5,
    year: '2024',
    title: 'The Complete 2024 Web Development Bootcamp',
    institution: 'Angela Yu',
    description: 'Bootcamp abrangente cobrindo todo o espectro do desenvolvimento web full stack.',
    tags: ['Full Stack', 'Web Dev', 'Bootcamp']
  },
  {
    id: 6,
    year: '2022',
    title: 'Curso Técnico: Web Design & Fundamentos',
    institution: 'Prodabel',
    description: 'Fundamentos sobre Páginas Web, Registro e Hospedagem de Sites, Design e Produção de Conteúdos, e Criação Prática de Sites.',
    tags: ['Web Design', 'Hosting', 'HTML/CSS']
  },
  {
    id: 7,
    year: '2016',
    title: 'Montagem e Manutenção de Redes e Computadores',
    institution: 'Mais Brasil',
    description: 'Curso técnico com foco em montagem, configuração e manutenção de hardware, além de instalação e administração de redes locais.',
    tags: ['Hardware', 'Redes', 'Suporte']
  }
];
</script>

<template>
  <section 
    id="experiencia" 
    ref="elementRef"
    :class="[
      'py-20 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <!-- Experience Section -->
    <div class="mb-20">
      <SectionTitle title="Experiência Profissional" subtitle="Vivências reais no mercado de trabalho e desenvolvimento." />
      
      <div class="relative mt-12">
        <!-- Vertical Line -->
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700 transform md:-translate-x-1/2"></div>
        <div class="space-y-12">
          <TimelineItem 
            v-for="(item, index) in experienceData" 
            :key="item.id" 
            :item="item" 
            :index="index" 
          />
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div id="educacao">
      <SectionTitle title="Formação Acadêmica & Cursos" subtitle="Cursos e especializações tecnológicas." />
      
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard 
          v-for="item in educationData" 
          :key="item.id" 
          :item="item" 
        />
      </div>
    </div>

  </section>
</template>
