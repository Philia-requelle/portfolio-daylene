<script setup lang="ts">
import CTAButton from './CTAButton.vue';

</script>

<template>

    <div
        class="flex flex-col items-center px-0 md:px-15 lg:px-30 md:items-start gap-8 md:gap-20 text-center md:text-left">
        <div>
            <p class="text-[2rem] md:text-7xl font-[LibreBodoni] italic">Have a Project in Mind?</p>
            <p class="text-wrap md:text-5xl"><span class="text-orange-500">I'm all ears-big or small,</span> let's chat
                <span class="text-orange-500">about how
                    we can work together.</span>
            </p>
        </div>
        <CTAButton name="Get in Touch" />
        <img src="../assets/arrow-downLeft.svg" alt="Arrow down-left"
            class="absolute md:left-124 md:bottom-80 lg:left-140 lg:bottom-68 invisible md:visible" />
    </div>
    <div class="w-full text-center text-xs md:text-[1.5625rem]">
        <div class="text-white bg-conic-90 from-[#A1BDB8] via-[#C35B3F] to-[#D782BA] py-8">
            <div class="flex flex-col lg:flex-row lg:justify-around gap-4 lg:gap-0">
                <div class="flex flex-col sm:flex-row justify-center gap-4 lg:gap-8">
                    <p>DAYLENE.DESIGN@gmail.com</p>
                    <p>BLESSANABLE MAQDAYLENE</p>
                </div>
                <p>IG @DAYLENE.DESIGN</p>
            </div>
        </div>
        <p class="text-orange-500 text-center md:text-left">©2025 Daylene Maqdaylene. All rights reserved.</p>
    </div>
</template>