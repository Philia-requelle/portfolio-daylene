<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Parallax, Pagination, Navigation } from 'swiper/modules'
import Card from '../components/Card.vue'
import { useHomeCard } from '../../composables/useHomeCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const homeCards = ref([])
const swiperRef = ref(null)

// Swiper modules needed for parallax effect
const modules = [Parallax, Pagination, Navigation]

// Swiper configuration with parallax effect
const swiperOptions = {
  parallax: true, // Enable parallax effect
  speed: 1000, // Transition duration between slides
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // Event handlers
  onSlideChange: () => {
    console.log('Slide changed')
  }
}

onMounted(async () => {
  homeCards.value = await useHomeCard()
})
</script>

<template>
  <!-- HERO SECTION -->
  <section class="relative flex flex-col items-center justify-center h-screen w-full">
    <!-- Top Left Square -->
    <div class="absolute top-2 left-1/8 py-4 px-5 bg-radial from-[#D782BA] from-20% to-[#C35B3F]"></div>
    <!-- Top Center Square -->
    <div class="absolute top-8 right-1/4 -translate-x-1/2 flex">
      <div class="relative p-10 -bg-conic-45 from-[#C35B3F] from-5% to-[#D782BA] to-60% opacity-86"></div>
      <div class="absolute py-4 px-5 bg-[#D782BA] left-2 bottom-2"></div>
    </div>
    <!-- Top Right Image -->
    <img src="../assets/[1]-home.svg" alt="nature image" class="absolute w-52 top-2 right-4 object-cover" />
    <!-- Left Image -->
    <img src="../assets/[2]-home.svg" alt="art image" class="absolute w-20 left-10 bottom-20 object-cover" />
    <!-- Centered Text -->
    <div class="flex flex-col items-center gap-2 z-10">
      <div class="flex flex-row items-center gap-2">
        <span class="text-4xl md:text-6xl font-karla text-[#C35B3F]">Hello</span>
        <span class="text-4xl md:text-6xl font-karla text-[#C35B3F]">I’m</span>
        <span class="text-4xl md:text-6xl font-[LibreBodoni] italic text-[#3B2C1A]">Daylene</span>
      </div>
      <div class="flex flex-row items-center gap-2">
        <span class="text-3xl md:text-5xl font-karla text-[#C35B3F]">a</span>
        <span class="text-3xl md:text-5xl font-[LibreBodoni] italic text-[#C35B3F]">Creative Designer.</span>
      </div>
      <div>
        <span class="text-3xl md:text-5xl font-karla text-[#C35B3F]">Based on Indonesia</span>
      </div>
    </div>
    <!-- Bottom Center Square -->
    <div class="absolute p-8 bottom-0 left-1/3 bg-[#D782BA]"></div>
  </section>
  <!-- ABOUT SUMMARY SECTION -->
  <section class="bg-[#C35B3F] text-white px-14 h-screen w-full flex flex-col items-center justify-center">
    <div class="flex flex-row gap-20">
      <img src="../assets/[3]-home.svg" alt="a person planting a tree" class="w-auto object-cover" />
      <div class="flex flex-col justify-between text-wrap">
        <p class="text-2xl">Hey there! I’m Daylene, a Bogor‑based creative graphic designer passionate about telling
          stories through color, type, and layout. Every project is an opportunity to learn—and to leave a lasting
          impression.</p>
        <router-link to="/about" class="flex flex-row gap-8 text-8xl underline">About me <img
            src="../assets/arrow-upRight.svg" alt="arrow" class="no-underline"></router-link>
      </div>
    </div>
  </section>
  <!-- WORK PARRALAX SECTION -->
  <section class="h-screen w-full flex flex-col items-center justify-center gap-20 px-8">
    <div class="flex flex-row justify-between items-center">
      <h2 class="text-8xl text-[#C35B3F]">My Work</h2>
      <p class="w-1/3">Fresh from the sketchbook—real problems I've tackled with design. Click any card to dive in.
      </p>
    </div>

    <!-- Swiper Container for Cards -->
    <div class="w-full max-w-6xl">
      <Swiper ref="swiperRef" :modules="modules" v-bind="swiperOptions" class="portfolio-swiper h-96"
        :slides-per-view="3" :space-between="30" :centered-slides="true" :loop="true">

        <!-- Dynamic Cards from Sanity Variants -->
        <SwiperSlide v-for="(item, index) in homeCards" :key="item._id" class="flex items-center justify-center">

          <!-- Card with individual Parallax -->
          <div class="w-full transform-gpu" :data-swiper-parallax="`${-200 + (index * 50)}`"
            :data-swiper-parallax-duration="600">
            <Card :title="item.title" :summary="item.summary" :image="item.imageUrl"
              :variant="index % 2 === 0 ? 'solid' : 'blur'" :href="`/project/${item.slug || item._id}`"
              class="hover:scale-105 transition-transform duration-300" />
          </div>
        </SwiperSlide>

        <!-- Navigation Elements -->
        <div class="swiper-button-next text-[#C35B3F] after:text-2xl"></div>
        <div class="swiper-button-prev text-[#C35B3F] after:text-2xl"></div>

        <!-- Pagination -->
        <div class="swiper-pagination bottom-4"></div>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
/* Custom styles for Swiper Parallax */
.portfolio-swiper {
  padding: 20px 0;
}

.portfolio-swiper .swiper-slide {
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Parallax background styling */
.parallax-bg {
  will-change: transform;
}

/* Enhanced card hover effects */
.portfolio-swiper .swiper-slide-active Card {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(195, 91, 63, 0.15);
}

/* Custom navigation styling */
.swiper-button-next,
.swiper-button-prev {
  color: #C35B3F !important;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 50px !important;
  height: 50px !important;
  margin-top: -25px !important;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 18px !important;
  font-weight: bold;
}

/* Custom pagination styling */
.swiper-pagination-bullet {
  background: #C35B3F !important;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1 !important;
  transform: scale(1.2);
}

/* Ensure smooth parallax animations */
[data-swiper-parallax] {
  will-change: transform;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .portfolio-swiper {
    --swiper-navigation-size: 35px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 35px !important;
    height: 35px !important;
    margin-top: -17.5px !important;
  }
}
</style>