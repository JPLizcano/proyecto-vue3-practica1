<script setup lang="ts">
import { ref, /*watch*/ } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Tipado
interface Item {
    label: string
    color: string
    bg: string
    to: string
    action?: () => void
}

// Props
/*const props =*/ defineProps<{ items: Item[] }>();

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
// watch(() => props.items, (newItems) => {
//     console.log(newItems);
// })
defineExpose({ closeDropdown })
</script>

<template>
    <div class="relative flex items-center" v-click-outside="closeDropdown">
        <button @click="toggleDropdown" class="rounded-full cursor-pointer">
            <!-- Ícono de tres puntos verticales -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-[rgb(255,90,0)]" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
        </button>

        <!-- <div v-show="isOpen" id="userDropdown" class="absolute right-0 top-8 w-40 bg-white rounded-md shadow-lg py-2 z-50"
        :class="{ active: isOpen }"> -->
        <div id="userDropdown" class="absolute right-0 top-8 w-40 bg-white rounded-md shadow-lg py-2"
            :class="{ active: isOpen }">
            <router-link v-for="item in items" :key="item.label" :to="item.to" @click="item.action"
                active-class="activo" class="flex justify-between px-4 py-2 text-base" :style="{
                    color: item.color || '#1f2937',
                    backgroundColor: isHovering === item.label
                        ? item.bg
                        : (route.path !== '/' && route.path === item.to)
                            ? item.bg
                            : 'transparent',
                    transition: 'all 0.3s ease'
                }" @mouseenter="isHovering = item.label" @mouseleave="isHovering = ''">
                {{ item.label }}
            </router-link>

        </div>
    </div>
</template>

<style scoped>
#userDropdown {
    background-color: rgb(255, 245, 240);
    transition: all 0.3s cubic-bezier(0.7, -1.3, 0.3, 2.3);
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    pointer-events: none;
    z-index: -50;
}

#userDropdown.active {
    opacity: 1;
    transform: scaleY(1);
    pointer-events: auto;
    z-index: 1;
}
</style>