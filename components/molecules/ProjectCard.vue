<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Project } from '../../types';
import { Database, Globe, Zap, Github, ExternalLink, Eye, X } from 'lucide-vue-next';
import BaseTag from '../atoms/BaseTag.vue';

const props = defineProps<{
  project: Project;
  isActive: boolean;
  index: number;
}>();

const showPreview = ref(false);

// Reset preview when project changes
watch(() => props.project, () => {
  showPreview.value = false;
});
</script>

<template>
  <div class="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl dark:shadow-2xl flex flex-col md:flex-row h-auto md:h-[450px]">
    
    <!-- Image / Live Preview Side -->
    <div class="md:w-1/2 relative overflow-hidden group bg-slate-100 dark:bg-slate-900">
      
      <!-- Static Image Mode -->
      <div v-if="!showPreview" class="w-full h-full relative">
        <div class="absolute inset-0 bg-brand-dark/10 dark:bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-all duration-500 z-10"></div>
        <img 
          :src="project.image" 
          :alt="project.title" 
          class="w-full h-full object-cover object-top transition-transform duration-700"
        />
        


        <!-- Visit Button Overlay -->
        <a 
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-brand-accentLight hover:bg-cyan-700 dark:bg-brand-neon dark:text-brand-dark dark:hover:bg-cyan-300 text-white px-6 py-3 rounded-full font-bold shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
        >
          <ExternalLink :size="20" />
          <span>Visitar Site</span>
        </a>
      </div>

      <!-- Live Iframe Mode -->
      <div v-else class="w-full h-full relative fade-in">
        <iframe 
          :src="project.demoUrl" 
          class="w-full h-full border-0"
          title="Live Preview"
          loading="lazy"
        ></iframe>
        
        <!-- Close Preview Button -->
        <button 
          @click="showPreview = false"
          class="absolute top-4 right-4 z-40 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
          title="Fechar Preview"
        >
          <X :size="20" />
        </button>
        
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full pointer-events-none backdrop-blur-sm">
          Interagindo com versão live
        </div>
      </div>
    </div>

    <!-- Content Side -->
    <div class="md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative">
      
      <div class="mb-6">
        <span class="text-brand-accentLight dark:text-brand-neon font-mono text-sm tracking-wider uppercase mb-2 block">{{ project.category || 'Portfolio' }}</span>
        <h3 class="text-3xl font-bold text-slate-800 dark:text-white mb-4">{{ project.title }}</h3>
        <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
          {{ project.description }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2 mb-8">
        <BaseTag v-for="tag in project.tags" :key="tag">{{ tag }}</BaseTag>
      </div>

      <div class="flex space-x-4 mt-auto">
        <a 
          v-if="project.repoUrl"
          :href="project.repoUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center space-x-2 text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 px-6 py-3 rounded-lg transition-all"
        >
          <Github :size="18" />
          <span>Repo</span>
        </a>
        <a 
          :href="project.demoUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="flex items-center space-x-2 text-white bg-brand-accentLight hover:bg-cyan-700 dark:text-brand-dark dark:bg-brand-neon dark:hover:bg-cyan-300 px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-cyan-500/20"
        >
          <ExternalLink :size="18" />
          <span>Visitar</span>
        </a>
      </div>

    </div>
  </div>
</template>
