<script setup lang="ts">
import SectionTitle from '../atoms/SectionTitle.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import { Layers, Globe } from 'lucide-vue-next';

const { elementRef, isVisible } = useIntersectionObserver(0.15);
</script>

<template>
  <section 
    id="sobre" 
    ref="elementRef"
    :class="[
      'py-20 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <SectionTitle title="Sobre Mim" />
    
    <div class="grid md:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="space-y-6">
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
          Cursando <strong>Análise e Desenvolvimento de Sistemas na Newton Paiva</strong>, sou movido pela curiosidade e pela vontade de aprender. No trabalho, já aplico na prática o que estudo, desenvolvendo aplicações web, agentes de IA e automações que resolvem problemas reais.
        </p>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
          Meu foco é desenvolvimento de software. Gosto de explorar diferentes tecnologias, desde Python e JavaScript até inteligência artificial. Acredito que a versatilidade e a capacidade de aprender rápido são os maiores diferenciais de um desenvolvedor.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <Globe class="text-brand-secondary mb-2" :size="24" />
            <h3 class="font-bold text-slate-800 dark:text-white">Curiosidade Infinita</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Sempre explorando novas tecnologias e ferramentas.</p>
          </div>
          <div class="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <Layers class="text-brand-accentLight dark:text-brand-neon mb-2" :size="24" />
            <h3 class="font-bold text-slate-800 dark:text-white">Aprendizado Prático</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">Transformando estudo em soluções funcionais.</p>
          </div>
        </div>
      </div>

      <!-- Visual Element / Photo placeholder -->
      <div class="relative group">
        <div class="absolute inset-0 bg-gradient-to-tr from-brand-accentLight to-brand-secondary dark:from-brand-neon dark:to-brand-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div class="relative bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-xl">
          <img 
            src="https://picsum.photos/600/600?grayscale" 
            alt="Developer Profile" 
            class="rounded-xl w-full object-cover shadow-inner grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  </section>
</template>
