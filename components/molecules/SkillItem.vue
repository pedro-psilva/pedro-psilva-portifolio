<script setup lang="ts">
import type { Skill } from '../../types';

defineProps<{
  skill: Skill;
}>();

const getWidth = (level: string) => {
  return level === 'Bom' ? '85%' : '45%';
};
</script>

<template>
  <div class="group">
    <div class="flex justify-between mb-2">
      <span class="font-mono text-sm md:text-base font-bold text-slate-700 dark:text-slate-200">
        {{ skill.name }}
      </span>
      <span class="font-mono text-sm text-brand-accentLight dark:text-brand-neon">
        {{ skill.level }}
      </span>
    </div>
    <div class="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300 dark:border-slate-700/50">
      <div 
        :class="[
          'h-full bg-gradient-to-r rounded-full transform origin-left transition-transform duration-1000 ease-out',
          skill.category === 'code' 
            ? 'from-cyan-400 to-blue-500 dark:from-cyan-500 dark:to-blue-500' 
            : skill.category === 'infra' 
            ? 'from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-500' 
            : skill.category === 'data'
            ? 'from-emerald-400 to-green-500 dark:from-emerald-500 dark:to-green-500'
            : 'from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-500'
        ]"
        :style="{ width: getWidth(skill.level) }"
      ></div>
    </div>
  </div>
</template>
