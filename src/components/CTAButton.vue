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
    <a :href="sendEmail"
        class="w-50 md:w-66 py-4 md:py-6 text-center text-lg md:text-2xl text-white rounded-md bg-linear-to-br from-[#C35B3F] from-30% to-[#D782BA] to-90% hover:opacity-80">
        {{ name }}
    </a>
</template>