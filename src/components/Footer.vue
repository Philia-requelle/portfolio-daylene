<script setup lang="ts">
import CTAButton from './CTAButton.vue';
</script>
<template>
    <div
        class="flex flex-col items-center px-15 md:items-start gap-8 md:gap-20 text-center md:text-left">
        <div>
            <p class="text-5xl md:text-7xl font-[LibreBodoni] italic">Have a Project in Mind?</p>
            <p class="text-wrap text-xl/8 md:text-5xl/14">
                <span class="text-terracotta">I'm all ears-bi<span class="font-[LibreBodoni] text-2xl md:text-6xl">g</span> or small,</span> let's chat
                <span class="text-terracotta">about how we can work to<span class="font-[LibreBodoni] text-2xl md:text-6xl">g</span>ether.</span>
            </p>
        </div>
        <CTAButton name="Get in Touch" />
        <img src="../assets/arrow-downLeft.svg" alt="Arrow down-left" aria-hidden="true"
            class="absolute md:left-124 md:bottom-80 lg:left-100 lg:bottom-62 invisible md:visible" />
    </div>
    <div class="w-full text-center text-xs md:text-[1.5625rem]">
        <div
            class="text-white py-8 bg-conic-90 from-[#A1BDB8] via-[var(--color-terracotta)] to-[var(--color-light-pink)]">
            <div class="flex flex-col lg:flex-row lg:justify-between px-8 gap-4 lg:gap-0 text-base">
                <p>BLESSANABLE MAQDAYLENE</p>
                <p>IG @DAYLENE.DESIGN</p>
                <p>DAYLENE.DESIGN@gmail.com</p>
            </div>
        </div>
        <p class="pl-8 text-terracotta text-sm text-center md:text-left">©2025 Daylene Maqdaylene. All rights reserved.</p>
    </div>
</template>