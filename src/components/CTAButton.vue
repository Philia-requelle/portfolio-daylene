<script setup>

const props = defineProps({
    name: String,
})

</script>

<template>
    <button
        class="w-50 md:w-66 py-4 md:py-6 text-lg md:text-2xl text-white rounded-md bg-linear-to-br from-[#C35B3F] from-30% to-[#D782BA] to-90% hover:opacity-80">{{ name }}</button>
</template>