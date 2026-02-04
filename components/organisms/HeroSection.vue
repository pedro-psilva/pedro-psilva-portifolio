<script setup lang="ts">
import { ChevronDown, Code2 } from 'lucide-vue-next';
import BaseButton from '../atoms/BaseButton.vue';
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-50 dark:bg-transparent transition-colors duration-300">
    <!-- Background Decorative Elements -->
    <div class="absolute top-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-cyan-200 dark:bg-brand-neon/20 rounded-full blur-3xl opacity-30 dark:opacity-20 -z-10 animate-pulse-slow"></div>
    <div class="absolute bottom-20 -left-20 w-48 md:w-72 h-48 md:h-72 bg-emerald-200 dark:bg-brand-secondary/20 rounded-full blur-3xl opacity-30 dark:opacity-20 -z-10 animate-pulse-slow"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
      <div class="inline-flex items-center space-x-2 bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full mb-8 backdrop-blur-sm animate-fade-in-up shadow-sm">
        <Code2 :size="16" class="text-brand-secondary" />
        <span class="text-xs md:text-sm font-mono text-slate-700 dark:text-brand-secondary">Software Developer</span>
      </div>
      
      <h1 class="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight animate-fade-in-up" style="animation-delay: 0.1s">
        Software <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-accentLight to-brand-secondary dark:from-brand-neon dark:to-brand-secondary">Developer</span>
      </h1>
      
      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-in-up md:leading-relaxed" style="animation-delay: 0.2s">
        Sou estudante de Análise e Desenvolvimento de Sistemas e trabalho na construção de soluções digitais claras e funcionais.
      </p>
      
      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 animate-fade-in-up" style="animation-delay: 0.3s">
        <BaseButton href="#projetos" variant="primary">Ver Portfolio</BaseButton>
        <BaseButton href="#contato" variant="outline">Entrar em Contato</BaseButton>
      </div>
    </div>

    <a href="#sobre" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-slate-400 dark:text-slate-500 hover:text-brand-accentLight dark:hover:text-brand-neon transition-colors animate-bounce">
      <ChevronDown :size="32" />
    </a>
  </section>
</template>
