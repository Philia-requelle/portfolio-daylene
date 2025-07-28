<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Parallax, Autoplay } from 'swiper/modules'
import Card from '../components/Card.vue'
import { useAboutHome } from '../../composables/useAboutHome'
import { useHomeCard } from '../../composables/useHomeCard'

import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/autoplay'

const homeCards = ref([])
const aboutHome = ref({ description: '', aboutImageUrl: '' });
const modules = [Parallax, Autoplay]

const swiperOptions = {
  loop: true,
  speed: 800,
  parallax: true,
  grabCursor: true,
  spaceBetween: 1,
  slidesPerView: 1,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    480: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
}

onMounted(async () => {
  const allCards = await useHomeCard()
  homeCards.value = allCards.slice(0, 5)
  aboutHome.value = await useAboutHome()
})
</script>

<template>
  <!-- HERO SECTION -->
  <section class="flex flex-col justify-center items-center lg:items-start h-screen w-full">
    <!-- Top Left Square -->
    <div class="absolute top-1/8 left-1/12 md:left-1/7 py-4 px-5 bg-radial from-[#D782BA] from-20% to-[#C35B3F]"></div>
    <!-- Top Center Square -->
    <div class="absolute top-1/5 right-1/2 lg:right-1/3 -translate-x-1/2 flex">
      <div class="relative p-10 -bg-conic-45 from-[#C35B3F] from-5% to-[#D782BA] to-60% opacity-86"></div>
      <div class="absolute py-4 px-5 bg-[#D782BA] left-2 bottom-2"></div>
    </div>
    <!-- Top Right Image -->
    <img src="../assets/[1]-home.svg" alt="nature image"
      class="absolute w-30 md:w-60 top-1/8 md:top-1/7 right-1/16 object-cover" />
    <!-- Down Left Image -->
    <img src="../assets/[2]-home.svg" alt="art image"
      class="absolute w-20 h-20 left-1/20 bottom-3/7 md:bottom-2/5 lg:bottom-2/5 object-cover" />
    <!-- Hero Text -->
    <div class="relative flex flex-col gap-2 z-10 pl-0 lg:pl-20 text-center md:text-start">
      <div class="flex flex-col md:flex-row gap-4 text-6xl md:text-7xl lg:text-8xl text-[#C35B3F]">
        <span>Hello I'm </span>
        <span class="font-[LibreBodoni] italic text-black">Daylene</span>
      </div>
      <div class="flex flex-col md:flex-row gap-4 text-6xl md:text-67xl lg:text-8xl text-[#C35B3F] pl-0 md:pl-20">
        <span>a</span>
        <span class="font-[LibreBodoni] italic">Creative Designer.</span>
      </div>
      <div>
        <span class="text-5xl md:text-7xl text-[#C35B3F]">Based on Indonesia</span>
      </div>
    </div>
    <!-- Bottom Center Square -->
    <div class="absolute p-8 bottom-1/14 left-1/2 md:left-1/3 bg-[#D782BA]"></div>
  </section>

  <!-- ABOUT SUMMARY SECTION -->
  <section class="bg-[#C35B3F] text-white px-14 h-screen w-full flex flex-col items-center justify-center">
    <div class="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
      <img :src="aboutHome.aboutImageUrl" alt="About image" class="w-auto object-cover" />
      <div class="flex flex-col items-center justify-center gap-12">
        <p class="text-2xl text-center lg:text-start text-wrap line-clamp-3"> {{ aboutHome.description }}</p>
        <router-link to="/about"
          class="flex flex-row gap-2 items-center justify-center lg:justify-start md:gap-8 text-5xl md:text-7xl underline w-full">About
          me <img src="../assets/arrow-upRight.svg" alt="arrow" class="no-underline size-20 md:size-28"></router-link>
      </div>
    </div>
  </section>

  <!-- WORK PARALLAX SECTION -->
  <section class="h-screen w-full flex flex-col items-center justify-around">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-0 px-8">
      <h2 class="text-8xl text-[#C35B3F] pt-12">My Work</h2>
      <p class="w-full md:w-1/3">Fresh from the sketchbook—real problems I've tackled with design. Click any card to
        dive in.</p>
    </div>

    <Swiper :modules="modules" v-bind="swiperOptions" class="h-[46rem] w-full">

      <SwiperSlide v-for="(item) in homeCards" :key="item._id">
        <div data-swiper-parallax="-70" data-swiper-parallax-duration="1000" data-swiper-parallax-scale="0.8">
          <Card v-if="item.slug && item.slug.current" :title="item.title" :summary="item.summary" :image="item.imageUrl"
            :portfolio-id="item.slug.current" overlay-class="bg-orange-500">
            <div class="absolute inset-0 flex justify-center items-center text-white text-2xl">
              See more
            </div>
          </Card>
        </div>
      </SwiperSlide>

    </Swiper>
  </section>
</template>

<style scoped>
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>