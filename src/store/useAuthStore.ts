import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { API_URL } from '../config/api';
import { useAlert } from '../composables/useAlert';

const { showAlert } = useAlert();

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const user = ref<{ Nombre: string; Apellido: string; idUsuario: number } | null>(null);

    // Iniciar sesion
    async function login(username: string, password: string) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                Usuario: username, Clave: password
            }, {
                withCredentials: true
            });

            // console.log(response)
            if (response.status !== 200) {
                showAlert(response.data.mensaje, "error");
                return response.data.mensaje;
            }

            const data = await response.data;
            // console.log(data)

            if (!data.resultado) {
                showAlert(data.mensaje, "error");
            } else {
                isAuthenticated.value = true;
                user.value = { Nombre: data.resultado.Nombre, Apellido: data.resultado.Apellido, idUsuario: data.resultado.ID };
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                showAlert(error.response.data.mensaje, "error");
                return error.status
            } else {
                return showAlert("Ha ocurrido un error inesperado", "error");
            }
        }
    }

    // Verificar sesión al cargar
    async function checkSession() {
        try {
            const response = await axios.get(`${API_URL}/auth/verificar`, {
                withCredentials: true
            });

            // console.log("checkSession:", response)
            if (response.data.usuario && response.data.usuario[0]) {
                user.value = response.data.usuario[0];
                isAuthenticated.value = true;
            }
        } catch (error) {
            console.error(error);
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
        login,
        checkSession,
        logout,
    };
});
