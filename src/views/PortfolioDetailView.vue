<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useportfolioDetail } from '../../composables/useportfolioDetail'

const route = useRoute()
const router = useRouter()

// Reactive data
const portfolio = ref(null)
const loading = ref(true)
const error = ref(null)

// Get project ID from route params
const portfolioId = route.params.id

onMounted(async () => {
    try {
        loading.value = true
        error.value = null

        // Fetch project detail data
        const portfolioData = await useportfolioDetail(portfolioId)

        if (!portfolioData) {
            return error.value = 'portfolio not found'
        }

        portfolio.value = portfolioData
    } catch (err) {
        return error.value = 'Failed to load portfolio details'
    } finally {
        loading.value = false
    }
})

// Function to go back
const goBack = () => {
    router.go(-1) // Go back to previous page
}
</script>
<!-- DUMMY portfolio DETAIL VIEW [NEED TO FIX]-->
<template>
    <div class="min-h-screen w-full">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C35B3F]"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex flex-col justify-center items-center h-screen">
            <h1 class="text-4xl text-[#C35B3F] mb-4">{{ error }}</h1>
            <button @click="goBack"
                class="px-6 py-3 bg-[#C35B3F] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Go Back
            </button>
        </div>

        <!-- portfolio Content -->
        <div v-else-if="portfolio" class="max-w-7xl mx-auto px-4 py-12">

            <!-- Back Button [need to fix: should go back to previous portfolio + add next button: should go to the next portfolio]-->
            <button @click="goBack"
                class="flex items-center gap-2 text-[#C35B3F] hover:text-opacity-70 transition-colors mb-8">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <!-- portfolio Header -->
            <div class="mb-12">
                <h1 class="text-4xl md:text-6xl font-bold text-[#C35B3F] mb-6">
                    {{ portfolio.title }}
                </h1>

                <!-- portfolio Meta Information -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div v-if="portfolio.role">
                        <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Role</h3>
                        <p class="text-lg">{{ portfolio.role }}</p>
                    </div>
                    <div v-if="portfolio.year">
                        <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Year</h3>
                        <p class="text-lg">{{ portfolio.year }}</p>
                    </div>
                    <div v-if="portfolio.contribution">
                        <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">Contribution</h3>
                        <p class="text-lg">{{ portfolio.contribution }}</p>
                    </div>
                </div>

                <!-- portfolio Summary -->
                <p class="text-xl text-gray-700 leading-relaxed">
                    {{ portfolio.summary }}
                </p>
            </div>

            <!-- Main Image -->
            <div v-if="portfolio.mainImageUrl" class="mb-12">
                <img :src="portfolio.mainImageUrl" :alt="portfolio.title" class="w-full h-auto rounded-lg shadow-lg" />
            </div>

            <!-- Full Description -->
            <div v-if="portfolio.description" class="mb-12">
                <h2 class="text-3xl font-bold text-[#C35B3F] mb-6">About This portfolio</h2>
                <div class="prose prose-lg max-w-none">
                    <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                        {{ portfolio.description }}
                    </p>
                </div>
            </div>

            <!-- Gallery -->
            <div v-if="portfolio.galleryImages && portfolio.galleryImages.length > 0" class="mb-12">
                <h2 class="text-3xl font-bold text-[#C35B3F] mb-6">Gallery</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="(image, index) in portfolio.galleryImages" :key="index"
                        class="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                        @click="openImageModal(image.largeUrl)">
                        <img :src="image.url" :alt="`${portfolio.title} - Image ${index + 1}`"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose {
    max-width: none;
}

.whitespace-pre-line {
    white-space: pre-line;
}
</style>
