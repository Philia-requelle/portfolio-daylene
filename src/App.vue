<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import CTAButton from './components/CTAButton.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="flex-grow">
    <RouterView />
  </main>
  <footer class="relative flex flex-col items-center md:items-start gap-8 md:gap-20 pt-8 pb-4">
    <Footer/>
  </footer>
</template>