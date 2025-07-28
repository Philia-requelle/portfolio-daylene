<script setup>
import { ref, onMounted } from 'vue'
import Card from '../components/Card.vue'
import { useWork } from '../../composables/useWork'

const workCards = ref([])

onMounted(async () => {
    workCards.value = await useWork()
})
</script>

<template>
    <div class="flex flex-col min-h-screen w-full px-4 pb-12">
        <div class="w-full max-w-7xl mx-auto">
            <h2 class="text-[#C35B3F] text-5xl md:text-7xl py-12">My Work</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-0 justify-items-center lg:[&>*:nth-child(3n-1)]:pt-12">
                <template v-for="item in workCards" :key="item.slug?.current">
                    <div v-if="item.slug && item.slug.current">
                        <Card :title="item.title" :summary="item.summary"
                            :image="item.imageUrl" :portfolio-id="item.slug.current"
                            overlay-class="backdrop-blur-md bg-opacity-80" class="max-w-80">
                        </Card>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>