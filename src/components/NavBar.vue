<script setup lang="ts">
import { ref } from 'vue';
import UserDropdown from '../components/UserDropdown.vue';
import LoginModal from '../view/LoginModal.vue';
import { useAuthStore } from '../store/useAuthStore';

const authStore = useAuthStore();

const dropdownItems = [
    { label: "Pruebas", color: "rgb(50,200,50)", bg: "rgb(50,200,50,0.15)", to: "/pruebas" },
    { label: "Perfil", color: "rgb(255,100,0)", bg: "rgb(255,100,0,0.15)", to: "/perfil" },
    { label: "Cerrar sesión", action: () => authStore.logout(), color: "rgb(255,0,0)", bg: "rgb(255,0,0,0.15)", to: "/" },
];

const openLoginModal = ref(false)

function handleClose() {
    openLoginModal.value = false
}

</script>

<template>
    <nav class="bg-[rgb(5,0,10)] py-4 px-5 text-white flex justify-between">
        <div class="text-lg font-semibold flex items-center">
            <img class="mx-auto h-[30px] w-auto rounded-md"
                src="https://res.cloudinary.com/dugq3o67b/image/upload/v1742428766/logo-storejys.png" alt="
                storejys" />
            <a href="/" class="ml-2 cursor-default hover:text-orange-400">STOREJYS</a>
        </div>
        <ul class="space-x-4 flex items-center">
            <li v-if="authStore.isAuthenticated">
                <p class="cursor-default hover:text-orange-400">{{ authStore.user?.Nombre || "No iniciado" }}</p>
            </li>
            <li v-if="authStore.isAuthenticated">
                <UserDropdown :items="authStore.isAuthenticated ? dropdownItems : []" />
            </li>
            <li v-if="!authStore.isAuthenticated">
                <button @click="openLoginModal = true" class="hover:text-orange-400 mx-2 cursor-pointer">Iniciar
                    sesión</button>
            </li>
        </ul>
    </nav>
    <LoginModal :isOpen="openLoginModal" @close="handleClose" />
</template>

<style scoped></style>