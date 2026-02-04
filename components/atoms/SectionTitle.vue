<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
}
defineProps<Props>();
</script>

<template>
  <div v-if="title" class="mb-12 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">
      <span class="text-brand-accentLight dark:text-brand-neon">#</span> {{ title }}
    </h2>
    <p v-if="subtitle" class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{{ subtitle }}</p>
    <div class="w-16 h-1 bg-brand-accentLight dark:bg-brand-neon mx-auto mt-4 rounded-full opacity-50"></div>
  </div>
</template>
