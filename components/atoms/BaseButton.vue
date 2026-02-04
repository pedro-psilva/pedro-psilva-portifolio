<script setup lang="ts">
defineProps<{
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
  <a v-if="href" :href="href" class="inline-flex items-center justify-center transition-all duration-300 font-bold rounded-lg"
    :class="[
      variant === 'primary' ? 'bg-brand-accentLight dark:bg-brand-neon text-white dark:text-brand-dark hover:bg-cyan-700 dark:hover:bg-cyan-300 shadow-lg shadow-cyan-500/20' : '',
      variant === 'outline' ? 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-slate-500 hover:text-black dark:hover:text-white bg-white/50 dark:bg-transparent' : '',
      'px-8 py-3'
    ]"
  >
    <slot></slot>
  </a>
  <button v-else :type="type || 'button'" class="inline-flex items-center justify-center transition-all duration-300 font-bold rounded-lg"
    :class="[
      variant === 'primary' ? 'bg-brand-accentLight dark:bg-brand-neon text-white dark:text-brand-dark hover:bg-cyan-700 dark:hover:bg-cyan-300 shadow-lg shadow-cyan-500/20' : '',
      'w-full py-4'
    ]"
  >
    <slot></slot>
  </button>
</template>
