<script setup lang="ts">
import type { EducationItem } from '../../types';
import { BookOpen, Calendar, Award } from 'lucide-vue-next';
import BaseTag from '../atoms/BaseTag.vue';

defineProps<{
  item: EducationItem;
}>();
</script>

<template>
  <div class="group h-full bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-accentLight dark:hover:border-brand-neon p-6 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-xs font-mono">
          <Calendar :size="14" />
          <span>{{ item.year }}</span>
        </div>
        <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-brand-secondary group-hover:text-brand-accentLight dark:group-hover:text-brand-neon transition-colors">
          <BookOpen v-if="item.title.toLowerCase().includes('curso')" :size="16" />
          <Award v-else :size="16" />
        </div>
      </div>
      
      <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 leading-tight group-hover:text-brand-secondary transition-colors">
        {{ item.title }}
      </h3>
      
      <p class="text-sm font-semibold text-brand-accentLight dark:text-brand-neon mb-3">
        {{ item.institution }}
      </p>
      
      <p class="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
        {{ item.description }}
      </p>
    </div>

    <div class="flex flex-wrap gap-2 mt-auto">
      <BaseTag v-for="tag in item.tags" :key="tag" size="xs">{{ tag }}</BaseTag>
    </div>
  </div>
</template>
