<script setup lang="ts">
import { ref } from 'vue';
import UserDropdown from '../components/UserDropdown.vue';
import LoginModal from '../view/LoginModal.vue';
import { useAuthStore } from '../store/useAuthStore';

const authStore = useAuthStore();
const userDropdownRef = ref();

const handleDropdown = () => {
    userDropdownRef.value?.closeDropdown()
}

const dropdownItems = [
    // { label: "Pruebas", action: () => { handleDropdown() }, color: "rgb(0,200,0)", bg: "rgb(50,200,50,0.15)", to: "/pruebas" },
    { label: "Perfil", action: () => { handleDropdown() }, color: "rgb(255,90,0)", bg: "rgb(255,90,0,0.15)", to: "/perfil" },
    { label: "Cerrar sesión", action: () => { authStore.logout(); handleDropdown() }, color: "rgb(255,0,0)", bg: "rgb(255,0,0,0.15)", to: "/" },
];

const openLoginModal = ref(false)

function handleClose() {
    openLoginModal.value = false
}

</script>

<template>
    <!-- <nav class="bg-[rgb(5,0,10)] py-4 px-5 text-white flex justify-between"> -->
    <nav class="bg-[rgb(255,245,240)] py-4 px-5 text-black flex justify-between">
        <div class="text-lg font-semibold flex items-center">
            <img class="mx-auto h-[30px] w-auto rounded-md"
                src="https://res.cloudinary.com/dugq3o67b/image/upload/v1742428766/logo-storejys.png" alt="
                storejys" />
            <router-link to="/" class="ml-2 cursor-default hover:text-[rgb(255,90,0)]">STOREJYS</router-link>
        </div>
        <ul class="space-x-4 flex items-center">
            <li v-if="authStore.isAuthenticated">
                <p class="cursor-default font-bold">{{ `${authStore?.user?.Nombre.split(' ')[0]}
                    ${authStore?.user?.Apellido.split(' ')[0]}` || "No iniciado" }}</p>
            </li>
            <li v-if="authStore.isAuthenticated">
                <UserDropdown :items="authStore.isAuthenticated ? dropdownItems : []" ref="userDropdownRef" />
            </li>
            <li v-if="!authStore.isAuthenticated">
                <button @click="openLoginModal = true"
                    class="hover:text-[rgb(255,90,0)] mx-2 cursor-pointer font-bold">Iniciar
                    sesión</button>
            </li>
        </ul>
    </nav>
    <LoginModal :isOpen="openLoginModal" @close="handleClose" />
</template>

<style scoped>
nav {
    box-shadow: 0px -8px 15px 10px gray;
}
</style>