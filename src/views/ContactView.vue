<script setup>
import CTAButton from '@/components/CTAButton.vue';
</script>

<template>
    <div class="w-full min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div class="flex flex-col gap-8">
            <p class="text-6xl md:text-7xl">Let's Keep</p>
            <p class="text-6xl md:text-8xl pl-0 md:pl-12 font-[LibreBodoni] italic">in Touch</p>
        </div>
        <div class="flex flex-col gap-12">
            <p class="text-2xl text-center md:text-start text-wrap">Whether you've got a question, a project idea, or just want to say hello, drop me a line and I'll be back in your inbox soon.</p>
            <CTAButton name="Send Email" />
        </div>
    </div>
</template>