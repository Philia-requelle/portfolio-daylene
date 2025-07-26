<script setup>
import { ref, onMounted } from 'vue';
import { useAbout } from '../../composables/useAbout';

const about = ref({ aboutImageUrl: '', description: '', experiences: [], educations: [], disciplines: [], tools: [] });

onMounted(async () => {
  const aboutData = await useAbout()
  about.value = aboutData
})

</script>
<template>
  <div>
    <!-- ABOUT SECTION -->
    <section class="bg-[#C35B3F] text-white px-6 md:px-14 h-screen w-full flex items-center justify-center">
      <div class="relative flex flex-col lg:flex-row gap-10 lg:gap-20 max-w-6xl w-full items-center lg:items-start">
        <img src="../assets/[5]-about.svg" alt="Circle decoration"
          class="size-10 md:size-12 absolute right-0 top-90 lg:top-0 z-10" />
        <!-- === Mobile screen size layout === -->
        <div class="flex flex-col lg:hidden gap-12 w-full">
          <h2 class="text-5xl">About Me</h2>
          <img :src="about.aboutImageUrl" alt="About image" class="object-cover w-auto max-w-50 mx-auto" />
          <p class="text-sm md:text-lg text-balance max-w-prose mx-auto">
            {{ about.description }}
          </p>
        </div>
        <!-- === Big screen size layout === -->
        <div class="hidden lg:flex flex-row w-full gap-20">
          <!-- Gambar kiri -->
          <img :src="about.aboutImageUrl" alt="About image" class="object-cover w-auto max-w-[400px]" />
          <div class="flex flex-col gap-6 text-left justify-center">
            <h2 class="text-6xl">About Me</h2>
            <p class="text-2xl max-w-prose">
              {{ about.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section class="flex flex-col h-screen w-full px-8 pb-12">
      <h2 class="text-4xl lg:text-6xl py-12">Experiences</h2>
      <div class="flex flex-row items-stretch gap-4 md:gap-8 min-h-[20rem]">
        <img src="../assets/[1]-about.svg" alt="Diamond gradient decoration" class="w-6 md:w-fit h-auto object-cover" />
        <div class="flex flex-col gap-8 flex-1">
          <div v-for="experience in about.experiences"
            class="flex flex-col-reverse md:flex-row justify-start md:justify-between gap-2 md:gap-6">
            <div>
              <h3 class="text-2xl">{{ experience.title }}</h3>
              <p class="text-xl">{{ experience.company }}</p>
              <p class="text-base md:text-lg text-balance">{{ experience.description }}</p>
            </div>
            <div>
              <p class="text-lg w-max">{{ experience.startDate }} - {{ experience.endDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION SECTION -->
    <section class="h-screen w-full px-8 pt-12">
      <div class="flex flex-col sm:flex-row sm:gap-0">
        <h2 class="text-4xl lg:text-6xl pb-12 sm:pb-0">Education</h2>
        <div v-for="education in about.educations" class="flex justify-end items-end pr-0 sm:pr-4">
          <div class="flex flex-col-reverse w-full sm:flex-row justify-end items-start gap-4">
            <div class="">
              <h3 class="text-2xl">{{ education.title }}</h3>
              <p class="text-xl">{{ education.institution }}</p>
              <p class="text-base md:text-lg text-balance">{{ education.description }}</p>
            </div>
            <div>
              <p class="text-lg w-max text-center">{{ education.startDate }} - {{ education.isCurrent ? "Now" :
                education.endDate }}</p>
            </div>
          </div>
        </div>
        <img src="../assets/[2]-about.svg" alt="Radial gradient decoration" class="h-80 sm:w-fit rotate-90 sm:rotate-0">
      </div>
    </section>
    <!-- DISCIPLINE SECTION -->
    <section class="relative flex flex-col h-screen w-full px-8">
      <h2 class="text-4xl lg:text-6xl py-12">Disciplines</h2>
      <!-- FIX: MAKE THE IMG OVERFLOW -->
      <div class=" w-fit sm:w-full flex flex-row-reverse sm:flex-row items-center gap-12 md:gap-20">
        <img src="../assets/[3]-about.svg" alt="Triangle gradient decoration"
          class="absolute sm:relative sm:inset-auto top-26 -right-22 w-50 sm:w-auto h-auto object-cover">
        <div class="flex flex-col gap-8">
          <div v-for="discipline in about.disciplines">
            <p class="text-lg text-balance">{{ discipline.name }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- TOOLS SECTION -->
    <section class="relative flex flex-col min-h-screen w-full px-8 overflow-hidden">
      <h2 class="text-4xl lg:text-6xl py-12">Tools</h2>
      <div class="flex flex-row justify-center md:justify-around items-start md:items-center gap-6 md:gap-8">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center md:justify-around">
          <div v-for="tool in about.tools" class="flex flex-col items-center text-center gap-2">
            <img :src="tool.iconUrl" :alt="tool.name" class="size-10">
            <p class="text-lg text-wrap">{{ tool.name }}</p>
          </div>
        </div>
        <div class="flex self-start md:self-center">
          <img src="../assets/[4]-about.svg" alt="Radial gradient decoration"
            class="w-8 md:w-full h-auto object-cover transform sm:transform-none scale-x-150 sm:scale-x-100 scale-y-50 sm:scale-y-100">
        </div>
      </div>
      <div class="absolute z-10 top-80 -left-4 sm:relative sm:pt-12 sm:inset-auto">
        <img src="../assets/[5]-about.svg" alt="Circle radial gradient decoration" class="size-10 sm:size-14">
      </div>
    </section>
  </div>
</template>