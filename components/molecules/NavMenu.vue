<script setup lang="ts">
import type { NavItem } from '../../types';

defineProps<{
  items: NavItem[];
}>();
</script>

<template>
  <nav class="hidden md:flex items-center space-x-8">
    <a 
      v-for="item in items"
      :key="item.label" 
      :href="item.href"
      class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon transition-colors"
    >
      {{ item.label }}
    </a>
  </nav>
</template>
