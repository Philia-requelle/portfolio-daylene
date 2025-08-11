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
    <section class="bg-terracotta text-white px-6 flex items-center justify-center">
      <div class="relative flex flex-col lg:flex-row gap-10 lg:gap-20 max-w-6xl w-full items-center lg:items-start">
        <img src="../assets/[5]-about.svg" alt="Circle decoration"
          class="absolute size-10 md:size-12 right-0 md:right-1/2 lg:right-0 lg:top-0 z-10" />
        <!-- === Mobile screen size layout === -->
        <div class="flex flex-col gap-4 md:gap-8 lg:hidden w-full">
          <h2 class="text-4xl md:text-5xl">About Me</h2>
          <img :src="about.aboutImageUrl" alt="About image" class="object-cover size-32 md:size-40" />
          <p class="text-sm md:text-base wrap-balance">
            {{ about.description }}
          </p>
        </div>
        <!-- === Big screen size layout === -->
        <div class="hidden lg:flex flex-row w-full gap-16">
          <!-- Gambar kiri -->
          <img :src="about.aboutImageUrl" alt="About image" class="object-cover size-80 self-center" />
          <div class="flex flex-col gap-6 text-left justify-center">
            <h2 class="text-6xl">About Me</h2>
            <p class="text-xl max-w-prose">
              {{ about.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE SECTION -->
    <section class="flex flex-col">
      <h2 class="text-4xl lg:text-6xl py-12">Experiences</h2>
      <div class="flex flex-row items-stretch gap-4 md:gap-8 min-h-[20rem]">
        <img src="../assets/[1]-about.svg" alt="Diamond gradient decoration"
          class="w-6 md:w-14 lg:w-32 h-auto object-cover" />
        <div class="flex flex-col gap-8 flex-1">
          <div v-for="experience in about.experiences"
            class="flex flex-col-reverse md:flex-row justify-start md:justify-between gap-2 md:gap-6">
            <div>
              <h3 class="text-base md:text-2xl wrap-balance">{{ experience.title }}</h3>
              <p class="text-sm md:text-xl">{{ experience.company }}</p>
              <p class="text-sm md:text-base lg:text-md text-gray-700 text-balance">{{ experience.description }}</p>
            </div>
            <div>
              <p class="text-lg w-max">{{ experience.startDate }} - {{ experience.endDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EDUCATION SECTION -->
    <section class="pt-12">
      <div class="flex flex-col sm:flex-row justify-between">
        <h2 class="text-4xl lg:text-6xl pb-12 sm:pb-0">Education</h2>
        <div v-for="education in about.educations" class="flex justify-between items-end pr-0 sm:pr-4">
          <div class="flex flex-col-reverse w-full sm:flex-row justify-end items-start gap-4">
            <div>
              <h3 class="text-base md:text-2xl wrap-balance">{{ education.title }}</h3>
              <p class="text-sm md:text-xl">{{ education.institution }}</p>
              <p class="text-sm md:text-base lg:text-md text-gray-700 wrap-balance">{{ education.description }}</p>
            </div>
            <div>
              <p class="text-lg w-max text-center">{{ education.startDate }} - {{ education.isCurrent ? "Now" :
                education.endDate }}</p>
            </div>
          </div>
        </div>
        <img src="../assets/[2]-about.svg" alt="Radial gradient decoration" class="flex self-center sm:self-end h-80 sm:w-fit rotate-90 sm:rotate-0 object-cover">
      </div>
    </section>

    <!-- DISCIPLINE SECTION -->
    <section class=" flex flex-col">
      <h2 class="text-4xl lg:text-6xl py-12">Disciplines</h2>
      <!-- FIX: MAKE THE IMG OVERFLOW -->
      <div class="relative w-fit md:w-full flex flex-row-reverse md:flex-row gap-12 md:gap-20">
        <!-- THIS IMAGE: CAUSE THAT MAKE ABOUT PAGE OVERFLOW -->
        <img src="../assets/[3]-about.svg" alt="Triangle gradient decoration"
          class="absolute md:relative md:inset-auto self-center -right-50 size-50 md:size-60 lg:size-auto h-auto object-cover">
        <div class="flex flex-col justify-center gap-8">
          <div v-for="discipline in about.disciplines">
            <p class="text-lg text-balance">{{ discipline.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TOOLS SECTION -->
    <section class="relative flex flex-col overflow-hidden pb-12">
      <h2 class="text-4xl lg:text-6xl py-12">Tools</h2>
      <div class="flex items-center justify-between">
        <div class="flex-grow flex justify-center">
          <div class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-8 w-full">
            <div v-for="tool in about.tools" class="flex flex-col items-center text-center gap-2">
              <img :src="tool.iconUrl" :alt="tool.name" class="size-10">
              <p class="text-lg text-wrap">{{ tool.name }}</p>
            </div>
          </div>
        </div>
        <div class="w-fit self-start md:self-center">
          <img src="../assets/[4]-about.svg" alt="Radial gradient decoration"
            class="w-8 h-auto object-cover transform sm:transform-none scale-x-150 sm:scale-x-100 scale-y-50 sm:scale-y-100">
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import 'tailwindcss';

section {
  @apply justify-center px-8 md:px-12;
}
</style>