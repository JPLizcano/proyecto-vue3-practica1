<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import WorkingIcon from '../assets/svg/working.vue';

// Tipado
interface Item {
    label: string
    color: string
    bg: string
    to: string
    action: () => void
}

// Props
const props = defineProps<{ items: Item[] }>();

// Estados locales
const isOpen = ref(false);
const isHovering = ref<string>('');

// Métodos
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
}
const closeDropdown = () => {
    isOpen.value = false;
}

// Watchers
watch(() => props.items, (newItems) => {
    console.log(newItems);
})
</script>

<template>
    <div class="relative flex items-center" v-click-outside="closeDropdown">
        <button @click="toggleDropdown" class="rounded-full cursor-pointer">
            <!-- Ícono de tres puntos verticales -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-[#ff6400]" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
        </button>

        <!-- <div v-show="isOpen" id="userDropdown" class="absolute right-0 top-8 w-40 bg-white rounded-md shadow-lg py-2 z-50"
        :class="{ active: isOpen }"> -->
        <div id="userDropdown" class="absolute right-0 top-8 w-40 bg-white rounded-md shadow-lg py-2"
            :class="{ active: isOpen }">
            <a v-for="item in items" :key="item.label" :href="item.to" @click="item.action"
                class="flex justify-between px-4 py-2 text-base"
                :style="{ color: item.color || '#1f2937', backgroundColor: isHovering === item.label ? item.bg || '#f3f4f6' : 'transparent', transition: 'all 0.3s ease' }"
                @mouseenter="isHovering = item.label" @mouseleave="isHovering = ''">
                {{ item.label }}
            </a>
        </div>
    </div>
</template>

<style scoped>
#userDropdown {
    transition: all 0.3s cubic-bezier(0.66, -1.42, 0.32, 2.65);
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
    z-index: -50;
}

#userDropdown.active {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
    z-index: 50;
}
</style>