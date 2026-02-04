<script setup lang="ts">
import { ref, reactive } from 'vue';
import SectionTitle from '../atoms/SectionTitle.vue';
import BaseInput from '../atoms/BaseInput.vue';
import BaseTextarea from '../atoms/BaseTextarea.vue';
import BaseButton from '../atoms/BaseButton.vue';
import { useIntersectionObserver } from '../../composables/useIntersectionObserver';
import { Send, CheckCircle, AlertCircle } from 'lucide-vue-next';

const { elementRef, isVisible } = useIntersectionObserver(0.15);

const formData = reactive({
  name: '',
  email: '',
  message: ''
});

const status = ref<'idle' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const validateForm = (name: string, email: string, message: string) => {
  if (!name.trim()) return "Por favor, digite seu nome.";
  if (!email.trim()) return "O e-mail é obrigatório.";
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Por favor, insira um e-mail válido.";
  
  if (!message.trim()) return "A mensagem não pode estar vazia.";
  
  return null;
};

const handleSubmit = (e: Event) => {
  e.preventDefault();
  
  const error = validateForm(formData.name, formData.email, formData.message);
  
  if (error) {
    status.value = 'error';
    errorMessage.value = error;
    return;
  }

  status.value = 'idle';
  setTimeout(() => {
    alert(`Obrigado, ${formData.name}! Sua mensagem foi enviada com sucesso.\n\n(Simulação de envio)`);
    formData.name = '';
    formData.email = '';
    formData.message = '';
    status.value = 'success';
    errorMessage.value = '';
    
    setTimeout(() => {
      status.value = 'idle';
    }, 3000);
  }, 500);
};
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
    <SectionTitle title="Entre em Contato" subtitle="Tem um projeto em mente ou quer apenas trocar uma ideia? Mande uma mensagem!" />
    
    <div class="max-w-2xl mx-auto bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm">
      
      <form @submit="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput 
            id="name" 
            label="Nome" 
            v-model="formData.name" 
            placeholder="Seu nome" 
          />
          <BaseInput 
            id="email" 
            label="E-mail" 
            type="email"
            v-model="formData.email" 
            placeholder="exemplo@email.com" 
          />
        </div>
        
        <BaseTextarea 
          id="message" 
          label="Mensagem" 
          v-model="formData.message" 
          placeholder="Como posso te ajudar?" 
        />

        <div v-if="status === 'error'" class="flex items-center text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          <AlertCircle :size="16" class="mr-2" />
          {{ errorMessage }}
        </div>

        <div v-if="status === 'success'" class="flex items-center text-emerald-500 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          <CheckCircle :size="16" class="mr-2" />
          Mensagem enviada com sucesso!
        </div>

        <BaseButton type="submit" variant="primary">
          <span>Enviar Mensagem</span>
          <Send :size="18" class="ml-2" />
        </BaseButton>
      </form>
    </div>
  </section>
</template>
