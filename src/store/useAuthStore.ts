import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { API_URL } from '../config/api';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = ref<{ Nombre: string; Apellido: string; } | null>(null);

    // Verificar sesión al cargar
    async function checkSession() {
        try {
            const response = await axios.get(`${API_URL}/auth/verificar`, {
                withCredentials: true, // Esto envía la cookie HttpOnly
            });
            console.log(response)
            if (response.data.usuario[0]) {
                user.value = response.data.usuario[0];
                isAuthenticated.value = true;
            }
        } catch (error) {
            // console.error("No hay sesión activa.", error);
        }
    }

    // Cerrar sesión
    async function logout() {
        try {
            await axios.post(`${API_URL}/auth/logout`, {}, {
                withCredentials: true,
            });
            user.value = null;
            isAuthenticated.value = false;
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    return {
        isAuthenticated,
        user,
        checkSession,
        logout,
    };
});
