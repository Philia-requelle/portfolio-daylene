<script setup>
const props = defineProps({
    title: String,
    summary: String,
    image: String,
    href: {
        type: String,
        default: '#'
    }
})
</script>

<template>
    <a :href="href"
        class="block bg-pink rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300 group">
        <!-- Image -->
        <div class="relative overflow-hidden h-48">
            <img :src="image" :alt="title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <!-- Content -->
        <div class="p-6">
            <h3 class="text-lg font-semibold mb-2 text-gray-900 transition-colors duration-200">
                {{ title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {{ summary }}
            </p>
        </div>
    </a>
</template>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>