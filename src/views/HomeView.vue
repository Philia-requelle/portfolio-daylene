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
  <section class="relative flex flex-col justify-center items-center lg:items-start h-screen w-full px-4 md:px-8">
    <div class="absolute grid grid-cols-3 grid-rows-3 grid-flow-row-dense h-screen p-8 w-[-webkit-fill-available]"
      aria-hidden="true">
      <!-- Decorative: Top Left Square -->
      <div class="bg-radial from-light-pink from-10% to-terracotta size-10 rounded-lg">
      </div>
      <!-- Decorative: Top Center Square -->
      <div class="flex relative">
        <div class="bg-conic-10 from-terracotta from-10% to-light-pink size-14 md:size-21"></div>
        <div class="absolute z-10 size-8 md:size-10 top-4 md:top-9 left-2 bg-light-pink opacity-90 rounded-md"></div>
      </div>
      <!-- Top Right Image -->
      <img src="../assets/[1]-home.svg" alt="nature image"
        class="justfiy-self-start-safe md:justify-self-end-safe w-30 md:w-56 object-cover" />
      <!-- Down Left Image -->
      <img src="../assets/[2]-home.svg" alt="art image" class="self-center size-20 object-cover" />
      <!-- Bottom Center Square -->
      <div class="col-start-2 row-start-3 self-end size-10 p-8 bg-light-pink"></div>
    </div>

    <!-- Hero Text -->
    <div class="flex flex-col gap-2 z-10 pl-0 lg:pl-20 text-center md:text-start text-[var(--color-terracotta)]">
      <div class="flex flex-col md:flex-row gap-4 text-6xl md:text-7xl lg:text-8xl hero-text-accent">
        <span>Hello I'm </span>
        <span class="font-[LibreBodoni] italic hero-text-heading">Daylene</span>
      </div>
      <div class="flex flex-col md:flex-row gap-4 text-6xl md:text-67xl lg:text-8xl hero-text-accent pl-0 md:pl-20">
        <span>a</span>
        <span class="font-[LibreBodoni] italic">Creative Designer.</span>
      </div>
      <div>
        <span class="text-5xl md:text-7xl hero-text-accent">Based on Indonesia</span>
      </div>
    </div>

  </section>

  <!-- ABOUT SUMMARY SECTION -->
  <section class="about-section text-white bg-terracotta px-14 w-full flex flex-col items-center justify-center">
    <div class="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
      <img :src="aboutHome.aboutImageUrl" alt="About Daylene" class="w-auto object-cover" />
      <div class="flex flex-col items-center justify-center gap-12">
        <p class="text-2xl text-center lg:text-start text-wrap line-clamp-3">{{ aboutHome.description }}</p>
        <router-link to="/about"
          class="about-link flex flex-row gap-2 items-center justify-center lg:justify-start md:gap-8 text-5xl md:text-7xl no-underline hover:underline w-full">
          About me
          <img src="../assets/arrow-upRight.svg" alt="" class="no-underline size-20 md:size-28" aria-hidden="true">
        </router-link>
      </div>
    </div>
  </section>

  <!-- WORK PARALLAX SECTION -->
  <section class="flex flex-col w-full items-center gap-12 pt-12">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-0 px-8">
      <h2 class="text-terracotta text-8xl">My Work</h2>
      <p class="text-gray-500 w-full md:w-1/3">Fresh from the sketchbook—real problems I've tackled with design.
        Click any card to
        dive in.</p>
    </div>

    <Swiper :modules="modules" v-bind="swiperOptions" class="h-[46rem] w-full">
      <SwiperSlide v-for="(item) in homeCards" :key="item._id">
        <div data-swiper-parallax="-70" data-swiper-parallax-duration="1000" data-swiper-parallax-scale="0.8">
          <Card v-if="item.slug && item.slug.current" :title="item.title" :summary="item.summary" :image="item.imageUrl"
            :portfolio-id="item.slug.current" overlay-class="bg-terracotta" class="w-auto md:w-[26rem]">
            <div class="absolute inset-0 flex justify-center items-center text-white text-2xl">
              See more
            </div>
          </Card>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>