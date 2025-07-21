<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
    title: String,
    summary: String,
    image: String,
    variant: {
        type: String,
        default: 'solid', // 'solid' or 'blur'
        validator: (value) => ['solid', 'blur'].includes(value)
    },
    href: {
        type: String,
        default: '#'
    }
})

const cardRef = ref(null)

// Computed classes depends on variant
const overlayClasses = computed(() => {
    return props.variant === 'solid'
        ? 'bg-[#C35B3F] group-hover:opacity-90' // Solid orange overlay
        : 'backdrop-blur-md bg-white/30 group-hover:opacity-100' // Blur effect
})

const textColorClasses = computed(() => {
    return props.variant === 'solid'
        ? 'text-white' // White text for solid overlay
        : 'text-[#3B2C1A]' // Dark text for blur overlay
})

onMounted(() => {
    if (cardRef.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in')
                }
            })
        }, { threshold: 0.1 })

        observer.observe(cardRef.value)
    }
})
</script>

<template>
    <div ref="cardRef"
        class="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 transform-gpu group cursor-pointer">

        <!-- Image Container with internal Parallax -->
        <div class="relative overflow-hidden h-48 group">
            <img :src="image" :alt="title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

            <!-- Dynamic Overlay depends on variant -->
            <div :class="[
                'absolute inset-0 opacity-0 transition-all duration-500 flex items-center justify-center',
                overlayClasses
            ]">

                <!-- See More Button/Text -->
                <a :href="href" :class="[
                    'font-semibold text-lg flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105',
                    textColorClasses
                ]">
                    See More
                    <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </div>

        <!-- Content Container -->
        <div class="p-6 relative">
            <!-- Title dengan Parallax effect -->
            <h3 class="text-xl font-semibold mb-3 text-[#3B2C1A] group-hover:text-[#C35B3F] transition-colors duration-300"
                data-swiper-parallax="-50" data-swiper-parallax-duration="400">
                {{ title }}
            </h3>

            <!-- Summary with staggered parallax -->
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4" data-swiper-parallax="-30"
                data-swiper-parallax-duration="500">
                {{ summary }}
            </p>
            <!-- Slot for additional content -->
            <div class="mt-4" data-swiper-parallax="-10" data-swiper-parallax-duration="700">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Enhanced backdrop blur support */
.backdrop-blur-md {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

/* Fallback for browsers that do not support backdrop-filter */
@supports not (backdrop-filter: blur()) {
    .backdrop-blur-md {
        background: rgba(255, 255, 255, 0.8) !important;
    }
}

/* Custom animations */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
}

/* Enhanced line clamp for cross-browser support */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth GPU acceleration */
.transform-gpu {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

/* Enhanced hover effects */
.group:hover .transform-gpu {
    transform: translateZ(0) translateY(-2px);
}

/* Smooth text animation */
.group:hover a {
    transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .group {
        margin: 0 10px;
    }

    .line-clamp-3 {
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }
}
</style>