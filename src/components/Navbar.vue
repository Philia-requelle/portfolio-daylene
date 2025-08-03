<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

// Get current route
const route = useRoute()

// Mobile menu state
const isMobileMenuOpen = ref(false)

const navItems = ref([
    {
        name: 'home',
        routeName: 'home',
        label: 'Home'
    },
    {
        name: 'about',
        routeName: 'about',
        label: 'About'
    },
    {
        name: 'work',
        routeName: 'work',
        label: 'Work'
    },
    {
        name: 'contact',
        routeName: 'contact',
        label: 'Talk to Her!'
    }
])

// Function to check if route is active
const isActive = (routeName) => {
    return route.name === routeName
}

// Mobile menu functions
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : 'unset'
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
    document.body.style.overflow = 'unset'
}

// Handle escape key
const handleEscape = (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
        closeMobileMenu()
    }
}

// Cleanup on unmount
onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'unset'
})

// Helper function to get nav link classes
const getNavLinkClasses = (routeName, isLastItem = false) => {
    if (isActive(routeName)) {
        return `text-terracotta ${ isLastItem ? 'text-terracotta' : 'text-black' }`
    }
}
</script>

<template>
    <nav class="relative z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

                <!-- Mobile: Hamburger Button (left) -->
                <div class="md:hidden">
                    <button @click="toggleMobileMenu"
                        class="inline-flex items-center justify-center p-2 hover:text-terracotta focus:outline-none relative z-50"
                        aria-expanded="false">
                        <!-- Hamburger Icon -->
                        <svg v-if="!isMobileMenuOpen" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>

                        <!-- Close Icon -->
                        <svg v-else class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Logo Section - Desktop: left, Mobile: right -->
                <router-link to="/" class="cursor-pointer flex-shrink-0 md:order-first order-last">
                    <img src="../assets/logo.svg" alt="logo" />
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="flex items-center gap-3">
                        <router-link
                            class="cursor-pointer px-3 py-2 text-lg transition-colors duration-200 last:border last:rounded-[100%]"
                            v-for="(item, index) in navItems" :key="item.name" :to="{ name: item.routeName }"
                            :class="getNavLinkClasses(item.routeName, index === navItems.length - 1)">
                            {{ item.label }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Overlay (Backdrop Blur) -->
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm"
            @click="closeMobileMenu">
        </div>

        <!-- Mobile Menu Sidebar -->
        <div class="md:hidden">
            <div class="bg-cream fixed top-0 left-0 h-full w-80 shadow-xl transition-transform ease-[cubic-bezier(0.4, 0, 0.2, 1)] duration-300 z-50"
                :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">

                <!-- Menu Header -->
                <div class="px-4 py-4">
                    <!-- close button -->
                    <button @click="closeMobileMenu" class="p-2 rounded-full">
                        <svg class="h-5 w-5" fill="none" stroke="black" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Menu Items -->
                <div class="px-4 py-6 space-y-3">
                    <router-link v-for="(item, index) in navItems" :key="item.name" :to="{ name: item.routeName }"
                        @click="closeMobileMenu"
                        class="cursor-pointer w-fit flex items-center px-4 py-3 text-3xl transition-colors duration-200 last:border last:rounded-[100%]"
                        :class="getNavLinkClasses(item.routeName, index === navItems.length - 1)">
                        {{ item.label }}
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>