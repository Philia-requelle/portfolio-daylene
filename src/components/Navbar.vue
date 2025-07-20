<style scoped>
/* Custom backdrop blur for older browsers */
@supports not (backdrop-filter: blur(8px)) {
    .backdrop-blur-sm {
        background-color: rgba(0, 0, 0, 0.4);
    }
}
</style>

<template>
    <nav class="bg-white relative z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">

                <!-- Mobile: Hamburger Button (left) -->
                <div class="md:hidden">
                    <button @click="toggleMobileMenu"
                        class="cursor-pointer inline-flex items-center justify-center p-2 text-gray-700 hover:text-orange-500 focus:outline-none relative z-50"
                        aria-expanded="false">
                        <span class="sr-only">Open main menu</span>

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
                <div class="flex-shrink-0 md:order-first order-last">
                    <img src="../assets/logo.svg" alt="logo" width="80" height="36" />
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:block">
                    <div class="flex items-center space-x-8">
                        <router-link v-for="item in navItems" :key="item.name" :to="{ name: item.routeName }"
                            class="px-3 py-2 text-sm font-medium transition-colors duration-200 text-gray-700 last:border last:rounded-[100%]"
                            :class="isActive(item.routeName)
                                ? 'text-orange-500 last:active:border-orange-500'
                                : 'text-gray-700 hover:text-orange-500 last:hover:border-orange-500'">
                            {{ item.label }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile Menu Overlay (Backdrop Blur) -->
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            @click="closeMobileMenu">
        </div>

        <!-- Mobile Menu Sidebar -->
        <div class="md:hidden">
            <div class="fixed top-0 left-0 h-full w-80 bg-[#F2F1F0] shadow-xl transition-transform ease-[cubic-bezier(0.4, 0, 0.2, 1)] duration-300 z-50"
                :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'">

                <!-- Menu Header -->
                <div class="px-4 py-4 border-b border-gray-200">
                    <!-- close button -->
                    <button @click="closeMobileMenu"
                        class="cursor-pointer p-2 text-gray-500 hover:text-orange-500 rounded-full">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Menu Items -->
                <div class="px-4 py-6 space-y-3">
                    <router-link v-for="(item, index) in navItems" :key="item.name" :to="{ name: item.routeName }"
                        @click="closeMobileMenu" class="flex items-center px-4 py-3 transition-colors duration-200"
                        :class="isActive(item.routeName) ? 'text-orange-500' : ''">

                        <span class="text-base font-medium transition-colors duration-200" :class="[index === navItems.length - 1 ? 'px-4 py-2 border rounded-[100%]' : 'hover:text-orange-500',
                        // Color logic
                        isActive(item.routeName) && index === navItems.length - 1
                            ? 'text-orange-500 border-orange-500'
                            : isActive(item.routeName)
                                ? 'text-orange-500'
                                : index === navItems.length - 1
                                    ? 'text-gray-700 hover:border-orange-500 hover:text-orange-500'
                                    : 'text-gray-700'
                        ]">
                            {{ item.label }}
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

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
    document.body.style.overflow = isMobileMenuOpen.value = !isMobileMenuOpen.value
        ? 'hidden'
        : 'unset';
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
</script>