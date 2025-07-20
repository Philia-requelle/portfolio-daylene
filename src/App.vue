<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="flex-grow">
    <RouterView />
  </main>
  <footer
    class="flex flex-col items-center md:items-start gap-8 md:gap-20 py-8 text-black">
    <div class="flex flex-col items-center md:items-start gap-8 md:gap-20 text-center md:text-left">
      <div>
        <p class="text-[2rem] md:text-7xl font-[LibreBodoni] italic">Have a Project in Mind?</p>
        <p class="text-wrap md:text-[3.9rem]"><span class="text-orange-500">I'm all ears-big or small,</span> let's chat
          <span class="text-orange-500">about how
            we can work together</span>.
        </p>
      </div>
      <button
        class="relative w-50 md:w-70 px-12 py-4 md:py-6 text-lg md:text-3xl text-white rounded-md bg-linear-to-br from-[#C35B3F] from-30% to-[#D782BA] to-90%">Get
        in Touch</button>
      <img src="./assets/arrow-downLeft.svg" alt="Arrow down-left"
        class="absolute left-90 -bottom-4 invisible md:visible" />
    </div>
    <div class="w-full text-center text-xs md:text-[1.5625rem]">
      <div class="flex flex-col md:flex-row justify-around gap-4 text-white bg-conic-90 from-[#A1BDB8] via-[#C35B3F] to-[#D782BA] py-8">
        <p>DAYLENE.DESIGN@gmail.com<span class="pl-[1rem] md:pl-16">DAYLENE MAQDAYLENE</span></p>
        <p>IG @DAYLENE.DESIGN</p>
      </div>
      <p class="text-orange-500">©2025 Daylene Maqdaylene. All rights reserved.</p>
    </div>
  </footer>
</template>