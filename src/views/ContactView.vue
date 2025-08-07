<script setup>
import CTAButton from '@/components/CTAButton.vue';
</script>

<template>
    <div
        class="relative w-full h-fit lg:h-screen p-8 grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-30 justify-center items-center">
        <div
            class="absolute z-10 grid grid-cols-2 sm:grid-cols-3 grid-rows-3 grid-flow-row-dense h-[-webkit-fill-available] px-8 w-full">
            <img src="../assets/[2]-contact.svg" alt="a rectangle decoration"
                class="self-start md:self-center lg:self-end size-6 -rotate-20">
            <div
                class="row-start-1 row-end-2 sm:row-start-2 sm:row-end-3 self-center sm:self-start justify-self-end sm:justify-self-start col-start-2 relative left-0 md:left-16 lg:left-1/6 md:bottom-12 lg:bottom-0">
                <img src="../assets/[1]-contact.svg" alt="an abstract rectangle decoration"
                    class="absolute z-11 -left-4 top-6">
                <img src="../assets/[2]-contact.svg" alt="a rectangle decoration" class="size-20 md:size-24 -rotate-20">
            </div>
            <img src="../assets/[2]-contact.svg" alt="a rectangle decoration"
                class="row-start-2 row-end-3 self-start sm:self-center col-start-1 left-8">
            <img src="../assets/[2]-contact.svg" alt="a rectangle decoration"
                class="row-start-3 row-end-4 col-start-2 size-8 self-center sm:self-end lg:self-start !mb-4 sm:!mb-0">
        </div>
        <div class="flex flex-col gap-8 w-min md:w-max">
            <p class="text-6xl lg:text-7xl">Let's Keep</p>
            <p class="text-7xl md:text-8xl pl-12 font-[LibreBodoni] italic">in Touch</p>
        </div>
        <div class="flex flex-col items-center sm:items-start gap-12">
            <p class="text-xl sm:text-2xl text-center sm:text-start text-wrap">Whether you've got a question, a project
                idea, or
                just want to say hello, drop me a line and I'll be back in your inbox soon.</p>
            <CTAButton name="Send Email" />
        </div>
    </div>
</template>