<script setup>
import { ref, computed } from 'vue'
const recipientEmail = ref('daylene.design@gmail.com')
const sendEmail = computed(() => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${ encodeURIComponent(recipientEmail.value) }`
})
const props = defineProps({
    name: String,
})
</script>
<template>
    <a :href="sendEmail" target="_blank"
        class="w-50 md:w-66 py-4 md:py-6 text-center text-lg md:text-2xl text-white rounded-md bg-linear-130 from-terracotta from-60% to-light-pink hover:opacity-80">
        {{ name }}
    </a>
</template>

<style scoped>
.gradient-button {
    background: linear-gradient(to bottom right, var(--color-gradient-start) 30%, var(--color-gradient-end) 90%);
}
</style>