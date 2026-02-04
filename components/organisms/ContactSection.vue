<script setup lang="ts">
import { ref } from 'vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import { Mail, Phone, Github, Linkedin, Check } from 'lucide-vue-next';

const { elementRef, isVisible } = useIntersectionObserver(0.15);
const emailCopied = ref(false);

const copyEmail = () => {
  navigator.clipboard.writeText('pedro.ppsilva07@gmail.com');
  emailCopied.value = true;
  setTimeout(() => {
    emailCopied.value = false;
  }, 2000);
};

const contacts = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '(31) 97221-4333',
    href: 'https://wa.me/5531972214333',
    color: 'text-green-500'
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/pedro-paulo-ads',
    href: 'https://www.linkedin.com/in/pedro-paulo-ads/',
    color: 'text-blue-600'
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '/pedro-psilva',
    href: 'https://github.com/pedro-psilva',
    color: 'text-slate-800 dark:text-white'
  }
];
</script>

<template>
  <section 
    id="contato" 
    ref="elementRef"
    :class="[
      'py-20 px-6 md:px-12 max-w-7xl mx-auto transition-all duration-1000',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    ]"
  >
    <SectionTitle title="Entre em Contato" subtitle="Vamos conversar? Entre em contato por qualquer um dos canais abaixo." />
    
    <div class="max-w-3xl mx-auto mt-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!-- Email Card - Copy to clipboard -->
        <button 
          @click="copyEmail"
          class="group flex items-center gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-left cursor-pointer"
        >
          <div :class="['p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50', emailCopied ? 'text-green-500' : 'text-red-500']">
            <Check v-if="emailCopied" :size="28" />
            <Mail v-else :size="28" />
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ emailCopied ? 'Copiado!' : 'E-mail' }}</p>
            <p class="font-semibold text-slate-800 dark:text-white group-hover:text-brand-secondary transition-colors">
              pedro.ppsilva07@gmail.com
            </p>
          </div>
        </button>

        <!-- Other contacts -->
        <a 
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex items-center gap-4 p-6 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <div :class="['p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50', contact.color]">
            <component :is="contact.icon" :size="28" />
          </div>
          <div>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ contact.label }}</p>
            <p class="font-semibold text-slate-800 dark:text-white group-hover:text-brand-secondary transition-colors">
              {{ contact.value }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
