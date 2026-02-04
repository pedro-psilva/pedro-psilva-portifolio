<script setup lang="ts">
import TheHeader from '../components/organisms/TheHeader.vue';
import HeroSection from '../components/organisms/HeroSection.vue';
import AboutSection from '../components/organisms/AboutSection.vue';
import SkillsSection from '../components/organisms/SkillsSection.vue';
import TimelineSection from '../components/organisms/TimelineSection.vue';
import ProjectsSection from '../components/organisms/ProjectsSection.vue';
import ContactSection from '../components/organisms/ContactSection.vue';
import TheFooter from '../components/organisms/TheFooter.vue';
</script>

<template>
  <div class="min-h-screen font-sans bg-slate-50 dark:bg-brand-dark text-slate-900 dark:text-slate-200 selection:bg-brand-accentLight dark:selection:bg-brand-neon selection:text-white dark:selection:text-brand-dark transition-colors duration-300">
    <TheHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>
