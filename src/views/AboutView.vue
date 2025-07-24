<script setup>
import { ref, onMounted } from 'vue';
import { useAbout } from '../../composables/useAbout';

const about = ref({ aboutImageUrl: '', description: '', exxperiences: [], educations: [], disciplines: [], tools: [] });

onMounted(async () => {
  const aboutData = await useAbout()
  about.value = aboutData
})

</script>
<template>
  <div>
    <!-- ABOUT SECTION -->
    <section class="bg-[#C35B3F] text-white px-14 h-screen w-full flex flex-col items-center justify-center">
      <div class="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        <img :src="about.aboutImageUrl" alt="About image" class="w-auto object-cover" />
        <div class="flex flex-col items-center lg:items-start gap-12">
          <h1 class="text-4xl lg:text-6xl">About Me</h1>
          <p class="text-2xl text-wrap line-clamp-3"> {{ about.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>