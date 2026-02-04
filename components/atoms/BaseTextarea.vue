<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  rows?: number;
  placeholder?: string;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="text-sm font-bold text-slate-700 dark:text-slate-300">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :rows="rows || 5"
      class="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-brand-accentLight dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-accentLight dark:focus:ring-brand-neon transition-all resize-none"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>
