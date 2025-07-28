<script setup>
import CTAButton from '@/components/CTAButton.vue';
</script>

<template>
    <div class="relative w-full h-fit lg:h-screen p-8 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-30 justify-center items-center">
        <div class="flex flex-col gap-8 text-balance">
            <p class="text-6xl md:text-7xl">Let's Keep</p>
            <p class="text-7xl md:text-8xl pl-12 font-[LibreBodoni] italic">in Touch</p>
        </div>
        <img src="../assets/[2]-contact.svg" alt="a rectangle decoration" class="z-10 absolute size-6 top-1/48 lg:top-3/10 left-1/16 md:left-1/26 lg:left-1/30 -rotate-20">
        <div class="absolute left-2/3 md:left-2/5 top-1/6 lg:top-2/6">
            <img src="../assets/[1]-contact.svg" alt="an abstract rectangle decoration" class="z-10 absolute size-16 top-3/14 right-1/2">
            <img src="../assets/[2]-contact.svg" alt="a rectangle decoration" class="z-9 relative size-20 md:size-24 -rotate-20">
        </div>
        <img src="../assets/[2]-contact.svg" alt="a rectangle decoration" class="z-10 absolute size-10 top-3/12 md:top-2/4 lg:top-2/4 left-8">
        <img src="../assets/[2]-contact.svg" alt="a rectangle decoration" class="z-10 absolute size-8 bottom-1/6 md:bottom-1/30 lg:bottom-2/6 right-1/6 md:right-1/2 lg:right-2/4">
        <div class="flex flex-col gap-12 items-center md:items-start">
            <p class="text-2xl text-center md:text-start text-wrap">Whether you've got a question, a project idea, or
                just want to say hello, drop me a line and I'll be back in your inbox soon.</p>
            <CTAButton name="Send Email" />
        </div>
    </div>
</template>