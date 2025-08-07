<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue'
import { useWork } from '../../composables/useWork'

const workCards = ref([])
const loading = ref(true)

onMounted(async () => {
    try {
        workCards.value = await useWork()
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <div class="flex flex-col min-h-screen w-full px-4 pb-12">
        <div class="w-full max-w-7xl mx-auto">
            <h2 class="text-terracotta text-5xl md:text-7xl py-12">My Work</h2>
            <!-- Loading message -->
            <div v-if="loading" class="flex justify-center items-center h-screen">
                <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-terracotta"></div>
            </div>

            <div v-else
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-0 justify-items-center lg:[&>*:nth-child(3n-1)]:pt-12">
                <template v-for="item in workCards" :key="item.slug?.current">
                    <div v-if="item.slug && item.slug.current">
                        <Card :title="item.title" :summary="item.summary" :image="item.imageUrl"
                            :portfolio-id="item.slug.current" overlay-class="backdrop-blur-md bg-opacity-80"
                            class="max-w-80 cursor-pointer">
                        </Card>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>