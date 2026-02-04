<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Menu, X, Sun, Moon, Github, Linkedin } from 'lucide-vue-next';
import type { NavItem } from '../../types';
import TheLogo from '../atoms/TheLogo.vue';
import NavMenu from '../molecules/NavMenu.vue';
import SocialLinks from '../molecules/SocialLinks.vue';

const navItems: NavItem[] = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Jornada', href: '#educacao' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
];

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isDark = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    isDark.value = false;
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    isDark.value = true;
  }
};

onMounted(() => {
  // Check localStorage - default to light mode
  if (localStorage.getItem('theme') === 'dark') {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white/80 dark:bg-brand-glass backdrop-blur-md border-b border-slate-200 dark:border-white/10 py-3 shadow-lg' 
        : 'bg-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
      <!-- Logo -->
      <TheLogo />

      <!-- Desktop Nav -->
      <NavMenu :items="navItems" />

      <!-- Socials & Actions -->
      <div class="hidden md:flex items-center space-x-4">
        <button 
          @click="toggleTheme"
          class="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          <Sun v-if="!isDark" :size="20" />
          <Moon v-else :size="20" />
        </button>
        
        <div class="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
        
        <SocialLinks />
      </div>

      <!-- Mobile Toggle -->
      <div class="flex items-center gap-4 md:hidden">
          <button 
            @click="toggleTheme"
            class="p-2 text-slate-800 dark:text-slate-100"
          >
             <Sun v-if="!isDark" :size="24" />
             <Moon v-else :size="24" />
          </button>
          <button 
            class="text-slate-800 dark:text-slate-100"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <X v-if="isMobileMenuOpen" :size="28" />
            <Menu v-else :size="28" />
          </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shadow-2xl p-6 flex flex-col space-y-6 animate-fade-in-up">
      <a 
        v-for="item in navItems"
        :key="item.label" 
        :href="item.href"
        class="text-lg font-medium text-slate-800 dark:text-slate-300 hover:text-brand-accentLight dark:hover:text-brand-neon"
        @click="isMobileMenuOpen = false"
      >
        {{ item.label }}
      </a>
      <div class="flex space-x-6 pt-4 border-t border-slate-200 dark:border-slate-800 justify-center">
          <a href="https://github.com/pedro-psilva" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white"><Github :size="24" /></a>
          <a href="https://www.linkedin.com/in/pedro-paulo-ads/" target="_blank" rel="noopener noreferrer" class="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"><Linkedin :size="24" /></a>
      </div>
      <a 
        href="https://wa.me/5531972214333" 
        target="_blank"
        rel="noopener noreferrer"
        class="bg-brand-accentLight dark:bg-brand-neon text-white dark:text-brand-dark font-bold text-center py-3 rounded-lg"
        @click="isMobileMenuOpen = false"
      >
        Conversar no WhatsApp
      </a>
    </div>
  </header>
</template>
