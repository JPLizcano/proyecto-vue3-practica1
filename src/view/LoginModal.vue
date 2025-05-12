<script setup lang="ts">
import { ref } from 'vue';
// import axios from 'axios';
// import { API_URL } from '../config/api';
import { useAlert } from '../composables/useAlert';
import CustomAlert from '../components/CustomAlert.vue';
import LoadingView from '../components/LoadingView.vue';
import { useAuthStore } from '../store/useAuthStore';

const props = withDefaults(defineProps<{
    isOpen: boolean
}>(), {
    isOpen: false
})

const isLoading = ref(false);
const user = ref("");
const pass = ref("");
const { showAlert } = useAlert();
const authStore = useAuthStore();

const login = async () => {
    try {
        isLoading.value = true;
        if (!user.value) {
            showAlert("Ingrese su usuario", "error", 2500);
            isLoading.value = false;
            return;
        }

        if (!pass.value) {
            showAlert("Ingrese su contraseña", "error", 2500);
            isLoading.value = false;
            return;
        }

        const log = await authStore.login(user.value, pass.value);

        if (log) {
            isLoading.value = false;
            return;
        }

        setTimeout(() => {
            user.value = ""
            pass.value = ""
            closeModal()
            isLoading.value = false;
        }, 500);

    } catch (error) {
        console.log(error);
        showAlert("Error en el servidor", "error", 2500);
    }
}

const emit = defineEmits<{
    (e: 'close'): void
}>()

function closeModal() {
    emit('close')
}

</script>

<template>
    <LoadingView :msg="'Cargando...'" :isLoad="isLoading" @close="isLoading = false" class="z-20" />
    <div v-if="props.isOpen"
        class="z-10 fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div class="bg-[rgba(255,255,255,0.5)] p-6 rounded-lg shadow-lg w-96 relative">
            <button class="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                @click="closeModal">✖</button>
            <h2 class="mb-3 mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Iniciar sesión</h2>
            <form class="space-y-6" v-on:submit.prevent="login">
                <div>
                    <div class="relative flex items-center justify-between">
                        <label for="Usuario" class=" block text-sm/6 font-medium text-gray-900">Usuario</label>
                    </div>
                    <div class="mt-1">
                        <input type="text" name="Usuario" id="Usuario" autocomplete="Usuario" v-model="user"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-transparent sm:text-sm/6">
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="Clave" class="block text-sm/6 font-medium text-gray-900">Contraseña</label>
                    </div>
                    <div class="mt-1">
                        <input type="password" name="Clave" id="Clave" autocomplete="current-Clave" v-model="pass"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-transparent sm:text-sm/6">
                    </div>
                </div>

                <div class="relative flex justify-center">
                    <div class="w-full">
                        <button type="submit" id="loginbtn" class="btns">
                            Iniciar
                        </button>
                        <div class="w-full flex justify-center mt-4 text-sm">
                            No tengo cuenta.
                            <button @click="closeModal">
                                <a href="/registro" class="ml-1 text-[rgb(255,90,0)] hover:text-[rgb(255,120,0)]">
                                    Registrarme
                                </a>
                            </button>
                        </div>
                    </div>
                    <CustomAlert class="z-40 top-20" />
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="css" scoped></style>