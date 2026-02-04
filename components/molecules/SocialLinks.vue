<script setup lang="ts">
import { Github, Linkedin, MessageCircle } from 'lucide-vue-next';
</script>

<template>
  <div class="flex items-center space-x-4">
    <a href="https://github.com/pedro-psilva" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub Profile">
      <Github :size="20" />
    </a>
    <a href="https://www.linkedin.com/in/pedro-paulo-ads/" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn Profile">
      <Linkedin :size="20" />
    </a>
    <a 
      href="https://wa.me/5531972214333" 
      target="_blank" 
      rel="noopener noreferrer"
      class="flex items-center space-x-2 bg-brand-accentLight/10 dark:bg-brand-neon/10 border border-brand-accentLight/50 dark:border-brand-neon/50 text-brand-accentLight dark:text-brand-neon px-4 py-2 rounded-full hover:bg-brand-accentLight dark:hover:bg-brand-neon hover:text-white dark:hover:text-brand-dark transition-all duration-300 font-semibold text-xs ml-2"
    >
      <MessageCircle :size="16" />
      <span>WhatsApp</span>
    </a>
  </div>
</template>
