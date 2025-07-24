<script setup>
import { ref, onMounted, watch, nextTick } from 'vue' // Import nextTick
import { useRoute, useRouter } from 'vue-router'
import { useportfolioDetail } from '../../composables/useportfolioDetail'

const route = useRoute()
const router = useRouter()

// Reactive data
const portfolio = ref(null)
const loading = ref(true)
const error = ref(null)

// Function to fetch portfolio details
const fetchPortfolio = async (slug) => {
    loading.value = true
    error.value = null
    portfolio.value = null
    try {
        const data = await useportfolioDetail(slug)
        if (!data) {
            error.value = 'Portfolio not found.'
        } else {
            portfolio.value = data
            await nextTick();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (err) {
        error.value = 'Failed to load portfolio.'
        await nextTick();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
        loading.value = false
    }
}

// Get project slug from route params and fetch on mount
const portfolioSlug = ref(route.params.id)
onMounted(() => {
    if (portfolioSlug.value) {
        fetchPortfolio(portfolioSlug.value)
    }
})

// Watch for changes in route params (when navigating between portfolios)
watch(() => route.params.id, (newSlug) => {
    if (newSlug && newSlug !== portfolioSlug.value) {
        portfolioSlug.value = newSlug
        fetchPortfolio(newSlug)
    }
}, { immediate: true })

// Function to go back (to the previous page in history)
const goBack = () => {
    router.go(-1)
}

// Function to navigate to previous project
const goToPreviousPortfolio = () => {
    if (portfolio.value && portfolio.value.previousPortfolioSlug) {
        const previousSlug = portfolio.value.previousPortfolioSlug.current || portfolio.value.previousPortfolioSlug
        router.push({ name: 'portfolio-detail', params: { id: previousSlug } })
    }
}

// Function to navigate to next project
const goToNextPortfolio = () => {
    if (portfolio.value && portfolio.value.nextPortfolioSlug) {
        const nextSlug = portfolio.value.nextPortfolioSlug.current || portfolio.value.nextPortfolioSlug
        router.push({ name: 'portfolio-detail', params: { id: nextSlug } })
    }
}
</script>

<template>
    <div class="min-h-screen w-full flex flex-col items-center px-8 py-12 relative">
        <!-- Loading component to fetch portfolio content -->
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C35B3F]"></div>
        </div>
        <!-- Error component when failed to fetch portfolio content -->
        <div v-else-if="error" class="flex flex-col justify-center items-center h-screen">
            <h1 class="text-4xl text-[#C35B3F] mb-4">{{ error }}</h1>
            <button @click="goBack"
                class="px-6 py-3 bg-[#C35B3F] text-white rounded-lg hover:bg-opacity-90 transition-colors">
                Back
            </button>
        </div>

        <!-- Portfolio content when successfully fetched -->
        <div v-else-if="portfolio" class="portfolio-content w-full flex flex-col gap-12">
            <!-- Go back button to previous page -->
            <button @click="goBack" class="flex gap-4 items-center text-xl md:text-3xl hover:underline">
                <img src="../assets/previous-arrow.svg" alt="Back arrow" class="size-6 md:size-10">
                Back
            </button>
            <!-- Portfolio detail information -->
            <div class="flex flex-col gap-8">
                <div
                    class="flex flex-col lg:flex-row justify-between items-center text-center lg:text-start gap-4 lg:gap-52">
                    <h1 class="text-4xl md:text-6xl text-[#C35B3F] text-wrap">
                        {{ portfolio.title }}
                    </h1>
                    <p class="text-wrap">
                        {{ portfolio.summary }}
                    </p>
                </div>

                <div v-if="portfolio.mainImageUrl">
                    <img :src="portfolio.mainImageUrl" :alt="portfolio.title"
                        class="w-full h-[36rem] object-cover rounded-lg shadow-lg" />
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div v-if="portfolio.role"
                        class="flex flex-col md:flex-row gap-2 justify-items-start lg:justify-center">
                        <h3 class="w-24 lg:w-auto">Role</h3>
                        <p>{{ portfolio.role }}</p>
                    </div>
                    <div v-if="portfolio.year"
                        class="flex flex-col md:flex-row gap-2 justify-items-start lg:justify-center">
                        <h3 class="w-24 lg:w-auto">Year</h3>
                        <p>{{ portfolio.year }}</p>
                    </div>
                    <div v-if="portfolio.contribution"
                        class="flex flex-col md:flex-row gap-2 justify-items-start lg:justify-center">
                        <h3 class="w-24 lg:w-auto">Contribution</h3>
                        <p>{{ portfolio.contribution }}</p>
                    </div>
                </div>

                <div v-if="portfolio.description">
                    <p class="leading-relaxed whitespace-pre-line">
                        {{ portfolio.description }}
                    </p>
                </div>
            </div>
            <!-- Portfolio gallery -->
            <div v-if="portfolio.galleryImages && portfolio.galleryImages.length > 0">
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center md:justify-items-start">
                    <div v-for="(image, index) in portfolio.galleryImages" :key="index"
                        class="w-fit h-fit flex gap-6 hover:overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <img :src="image.url" :alt="`${portfolio.title} - Image ${index + 1}`"
                            class="rounded-lg object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                </div>
            </div>
            <!-- Portfolio links -->
            <div v-if="portfolio.links && portfolio.links.length > 0">
                <ul class="space-y-2">
                    <li v-for="(link, index) in portfolio.links" :key="index"
                        class="border-b p-3 text-[#525252] overflow-hidden text-ellipsis whitespace-nowrap">
                        <a :href="link" target="_blank" rel="noopener noreferrer" class="hover:underline">
                            {{ link }}
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Navigation buttons -->
            <div class="flex justify-between items-center py-12 w-full">
                <button @click="goToPreviousPortfolio" :disabled="!portfolio || !portfolio.previousPortfolioSlug"
                    class="flex gap-4 items-center text-xl md:text-3xl hover:underline"
                    :class="{ 'opacity-50 cursor-not-allowed': !portfolio || !portfolio.previousPortfolioSlug }">
                    <img src="../assets/previous-arrow.svg" alt="Previous arrow" class=" size-6 md:size-10">
                    Back
                </button>

                <button @click="goToNextPortfolio" :disabled="!portfolio || !portfolio.nextPortfolioSlug"
                    class="flex gap-4 items-center text-xl md:text-3xl text-[#C35B3F] hover:underline"
                    :class="{ 'opacity-50 cursor-not-allowed': !portfolio || !portfolio.nextPortfolioSlug }">
                    Next
                    <img src="../assets/next-arrow.svg" alt="Next arrow" class="size-6 md:size-10">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.portfolio-content {
    p {
        color: #525252;
        font-size: 1rem;
    }
    h3 {
        color: #3D2B27;
        font-weight: 700;
    }
}

.whitespace-pre-line {
    white-space: pre-line;
}
</style>