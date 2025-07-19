<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p class="text-center text-gray-500">© 2023 My Portfolio. All rights reserved.</p>
  </footer>
</template>