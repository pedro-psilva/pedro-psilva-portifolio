<script setup lang="ts">
import type { EducationItem } from '../../types';
import { Award } from 'lucide-vue-next';
import BaseTag from '../atoms/BaseTag.vue';

defineProps<{
  item: EducationItem;
  index: number;
}>();
</script>

<template>
  <div :class="['relative flex items-center md:justify-between', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']">
    
    <!-- Dot -->
    <div class="absolute left-4 md:left-1/2 w-4 h-4 bg-brand-accentLight dark:bg-brand-neon rounded-full border-4 border-slate-50 dark:border-slate-900 transform -translate-x-2 md:-translate-x-1/2 z-10"></div>

    <!-- Content Card -->
    <div class="ml-12 md:ml-0 md:w-[45%]">
      <div class="bg-white dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-secondary/50 transition-all duration-300 backdrop-blur-sm group shadow-sm hover:shadow-md">
        <div class="flex items-center justify-between mb-2">
          <span class="text-brand-accentLight dark:text-brand-neon font-mono text-sm">{{ item.year }}</span>
          <Award v-if="index === 0" :size="18" class="text-yellow-500" />
        </div>
        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-brand-secondary transition-colors">{{ item.title }}</h3>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-4">{{ item.institution }}</p>
        <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
          {{ item.description }}
        </p>
        <div class="flex flex-wrap gap-2">
          <BaseTag v-for="tag in item.tags" :key="tag">{{ tag }}</BaseTag>
        </div>
      </div>
    </div>
    
    <!-- Empty space for the other side -->
    <div class="hidden md:block md:w-[45%]"></div>
  </div>
</template>
