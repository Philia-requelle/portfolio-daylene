<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    title: String,
    summary: String,
    image: String,
    portfolioId: {
        type: String,
        required: true
    },
    overlayClass: {
        type: String,
        default: 'bg-orange-500 bg-opacity-80'
    }
})
</script>

<template>
    <router-link :to="{ name: 'portfolio-detail', params: { id: portfolioId } }"
        class="grid grid-rows-[auto_1fr] rounded-lg border overflow-hidden relative group">
        <div class="relative h-64 overflow-hidden w-full">
            <img :src="image" :alt="title"
                class="p-2 rounded-2xl w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-6 bg-white flex flex-col">
            <h3 class="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 h-14">
                {{ title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-1 mt-auto">
                {{ summary }}
            </p>
        </div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            :class="overlayClass">
            <span class="text-white text-2xl font-semibold">See more</span>
        </div>
    </router-link>
</template>