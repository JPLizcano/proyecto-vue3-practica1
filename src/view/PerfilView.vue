<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { API_URL } from '../config/api';
import LoadingView from '../components/LoadingView.vue';
import CustomAlert from '../components/CustomAlert.vue';
import { useAlert } from '../composables/useAlert';

const authStore = useAuthStore();
const router = useRouter();
const { showAlert } = useAlert();

const isLoading = ref(false);

onMounted(async () => {
    // await authStore.checkSession();
    if (!authStore.isAuthenticated) {
        router.push('/');
    }

    try {
        isLoading.value = true;
        const response = await axios.post(`${API_URL}/usuarios/buscar`, {
            idUsuario: authStore?.user?.idUsuario
        }, {
            withCredentials: true
        });

        const data = response.data[0][0];

        Object.keys(formData).forEach((key) => {
            (formData as any)[key] = data[key] || '';
        });
        isLoading.value = false;
    } catch (error) {
        console.error(error);
        showAlert("Error al cargar datos del usuario", "error");
        isLoading.value = false;
    }
})

const formSchema: {
    name: keyof typeof formData;
    label: string;
    type: string;
    placeholder: string;
}[] = [
        { name: 'Celular', label: 'Celular', type: 'tel', placeholder: 'Ingrese su número de celular' },
        { name: 'Correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ingrese su correo' },
        { name: 'Direccion', label: 'Dirección', type: 'text', placeholder: 'Ingrese su Dirección' },
        { name: 'Barrio', label: 'Barrio', type: 'text', placeholder: 'Ingrese su Barrio' },
        { name: 'Ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ingrese su Ciudad' },
        { name: 'Departamento', label: 'Departamento', type: 'text', placeholder: 'Ingrese su Departamento' },
        { name: 'Clave', label: 'Contraseña', type: 'password', placeholder: 'Ingrese una contraseña' },
    ];

const formData = reactive({
    Cedula: '',
    Celular: '',
    Correo: '',
    Direccion: '',
    Barrio: '',
    Ciudad: '',
    Departamento: '',
    Clave: ''
});

const ActualizarDatos = async () => {
    try {
        isLoading.value = true;
        const response = await axios.post(`${API_URL}/usuarios/actualizar`, {
            Cedula: formData.Cedula,
            Celular: formData.Celular,
            Correo: formData.Correo,
            Direccion: formData.Direccion,
            Barrio: formData.Barrio,
            Ciudad: formData.Ciudad,
            Departamento: formData.Departamento,
            Pass: formData.Clave
        }, {
            withCredentials: true
        })
        const data = response.data[0][0];

        if (!response.data[0][0].Mensaje) {
            window.location.reload();
            return;
        }
        setTimeout(() => {
            if (response.data[0][0].Mensaje !== "Datos actualizados con éxito") {
                console.log(data)
                showAlert(response.data[0][0].Mensaje, "error")
            } else {
                Object.keys(formData).forEach((key) => {
                    (formData as any)[key] = data[key] || '';
                });
                showAlert(response.data[0][0].Mensaje, "success")
            }
            isLoading.value = false;
        }, 500);
    } catch (error) {
        showAlert("Error al actualizar los datos", "error")
        console.log(error);
    }
}

</script>

<template>
    <LoadingView :msg="'Actualizando...'" :isLoad="isLoading" @close="isLoading = false" class="z-20" />
    <div class="flex items-center justify-center my-10 w-full h-full">
        <div class="bg-[rgb(255,245,240)] p-6 rounded-lg shadow-lg w-[850px] relative">
            <router-link to="/" class="absolute top-3 left-3">
                <svg width="40" height="40" viewBox="0 0 24 25" fill="none" transform="rotate(0 0 0)"
                    class="fill-[#ff6e00] hover:fill-[rgb(255,140,0)] transition-colors duration-200">
                    <path
                        d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM11.4982 9.15521C11.2178 9.03915 10.8952 9.10341 10.6808 9.31801L8.04259 11.9578C7.89904 12.0945 7.80957 12.2874 7.80957 12.5012C7.80957 12.7277 7.90996 12.9307 8.06867 13.0682L10.6807 15.6821C10.8952 15.8967 11.2178 15.961 11.4981 15.8449C11.7785 15.7289 11.9612 15.4554 11.9612 15.152V13.2512L15.4402 13.2512C15.8544 13.2512 16.1902 12.9154 16.1902 12.5012C16.1902 12.087 15.8544 11.7512 15.4402 11.7512H11.9612V9.84817C11.9612 9.54478 11.7785 9.27127 11.4982 9.15521Z" />
                </svg>
            </router-link>
            <h2 class="mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Perfil de usuario</h2>
            <form @submit.prevent="ActualizarDatos" class="gap-4 grid grid-cols-3">
                <div v-for="(field, index) in formSchema" :key="index">
                    <label :for="field.name" class="block text-sm font-bold mb-2">{{ field.label }}</label>
                    <input :type="field.type" :name="field.name" :placeholder="field.placeholder"
                        v-model="formData[field.name]" class="border rounded w-full py-2 px-3"
                        style="border-color: rgb(150,150,150);" />
                </div>
                <div class="col-span-3 relative flex justify-center">
                    <CustomAlert class="z-10 top-12" />
                    <button @type="!isLoading ? 'submit' : ''" class="btns">Actualizar datos</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="css" scoped>
input {
    background: white;
}
</style>