<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAlert } from '../composables/useAlert';
import CustomAlert from '../components/CustomAlert.vue';
import LoadingView from '../components/LoadingView.vue';
import axios from 'axios';
import { API_URL } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';
import Eye from '../assets/svg/eye.vue';
import EyeSlash from '../assets/svg/eyeSlash.vue';

const { showAlert } = useAlert();
const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const showPass = ref(false);

function showP() {
    showPass.value = !showPass.value
}

onMounted(async () => {
    await authStore.checkSession();
    if (authStore.isAuthenticated) {
        router.push('/');
    }
})

const registro = async () => {
    try {
        isLoading.value = true;
        for (const [key, value] of Object.entries(formData)) {
            if (!value) {
                if (key == "Clave") {
                    showAlert(`El campo contraseña es obligatorio.`, "error");
                    isLoading.value = false;
                    return false;
                }
                if (key == "ConfirmarClave") {
                    showAlert(`El campo confirmar contraseña es obligatorio.`, "error");
                    isLoading.value = false;
                    return false;
                }
                showAlert(`El campo ${key} es obligatorio.`, "error");
                isLoading.value = false;
                return false;
            }
        }

        if (formData.Clave != formData.ConfirmarClave) {
            showAlert(`Las contraseñas deben ser iguales`, "error");
            isLoading.value = false;
            return false;
        }

        const response = await axios.post(`${API_URL}/usuarios/registrar`, {
            Nombre: formData.Nombre,
            Apellido: formData.Apellido,
            Celular: formData.Celular,
            Cedula: formData.Cedula,
            Correo: formData.Correo,
            Direccion: formData.Direccion,
            Barrio: formData.Barrio,
            Ciudad: formData.Ciudad,
            Departamento: formData.Departamento,
            Pass: formData.Clave,
        }, {
            withCredentials: true
        })

        if (response.status !== 200) {
            showAlert(response.data.mensaje, "error");
            return;
        }
        const data = await response.data;

        if (data[0][0].Mensaje != "Usuario creado con éxito") {
            showAlert(data[0][0].Mensaje, "error");
            isLoading.value = false;
            return;
        } else {
            showAlert(data[0][0].Mensaje, "success");
            setTimeout(() => {
                isLoading.value = false;
                router.push('/');
            }, 500);
        }
    } catch (error) {
        isLoading.value = false;
        showAlert("Error inesperado con el registro", "error");
        console.log(error)
    }
}

const formSchema: {
    name: keyof typeof formData;
    label: string;
    type: string;
    placeholder: string;
}[] = [
        { name: 'Nombre', label: 'Nombre', type: 'text', placeholder: 'Ingrese su nombre' },
        { name: 'Apellido', label: 'Apellido', type: 'text', placeholder: 'Ingrese su apellido' },
        { name: 'Celular', label: 'Celular', type: 'text', placeholder: 'Ingrese su número de celular' },
        { name: 'Cedula', label: 'Cédula', type: 'text', placeholder: 'Ingrese su número de documento' },
        { name: 'Correo', label: 'Correo Electrónico', type: 'email', placeholder: 'Ingrese su correo' },
        { name: 'Direccion', label: 'Dirección', type: 'text', placeholder: 'Ingrese su Dirección' },
        { name: 'Barrio', label: 'Barrio', type: 'text', placeholder: 'Ingrese su Barrio' },
        { name: 'Ciudad', label: 'Ciudad', type: 'text', placeholder: 'Ingrese su Ciudad' },
        { name: 'Departamento', label: 'Departamento', type: 'text', placeholder: 'Ingrese su Departamento' },
        { name: 'Clave', label: 'Contraseña', type: 'password', placeholder: 'Ingrese una contraseña' },
        { name: 'ConfirmarClave', label: 'Confirmar contraseña', type: 'password', placeholder: 'Confirme la contraseña' },
    ];

const formData = reactive({
    Nombre: '',
    Apellido: '',
    Celular: '',
    Cedula: '',
    Correo: '',
    Direccion: '',
    Barrio: '',
    Ciudad: '',
    Departamento: '',
    Clave: '',
    ConfirmarClave: ''
});

</script>

<template>
    <LoadingView :msg="'Cargando...'" :isLoad="isLoading" @close="isLoading = false" class="z-20" />
    <div class="flex items-center justify-center my-10 w-full h-full">
        <div class="bg-[rgb(255,245,240)] p-6 rounded-lg w-[850px] relative registroCont">
            <router-link to="/" class="absolute top-3 left-3">
                <svg width="40" height="40" viewBox="0 0 24 25" fill="none" transform="rotate(0 0 0)"
                    class="fill-[#ff6e00] hover:fill-[rgb(255,140,0)] transition-colors duration-200">
                    <path
                        d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM11.4982 9.15521C11.2178 9.03915 10.8952 9.10341 10.6808 9.31801L8.04259 11.9578C7.89904 12.0945 7.80957 12.2874 7.80957 12.5012C7.80957 12.7277 7.90996 12.9307 8.06867 13.0682L10.6807 15.6821C10.8952 15.8967 11.2178 15.961 11.4981 15.8449C11.7785 15.7289 11.9612 15.4554 11.9612 15.152V13.2512L15.4402 13.2512C15.8544 13.2512 16.1902 12.9154 16.1902 12.5012C16.1902 12.087 15.8544 11.7512 15.4402 11.7512H11.9612V9.84817C11.9612 9.54478 11.7785 9.27127 11.4982 9.15521Z" />
                </svg>
            </router-link>
            <h2 class="mb-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Registro de usuario</h2>
            <form @submit.prevent="registro" class="gap-4 grid grid-cols-3">
                <div v-for="(field, index) in formSchema" :key="index"
                    :class="[field.name == 'Clave' ? 'relative' : '']">
                    <label :for="field.name" class="block text-sm font-bold mb-2">{{ field.label }}</label>
                    <input
                        :type="field.name == 'Clave' || field.name == 'ConfirmarClave' ? !showPass ? 'password' : 'text' : field.type"
                        :name="field.name" :placeholder="field.placeholder" v-model="formData[field.name]"
                        :class="['border rounded w-full py-2 px-3']" style="border-color: rgb(150,150,150);" />
                    <button v-show="field.name == 'Clave'" class="pasBtn" @click="showP" type="button">
                        <Eye v-show="!showPass" />
                        <EyeSlash v-show="showPass" />
                    </button>
                </div>
                <div class="col-span-3 relative flex justify-center">
                    <CustomAlert class="z-10 top-12" />
                    <button type="submit" class="btns">Registrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="css" scoped>
input {
    background: white;
}

.pasBtn {
    cursor: pointer;
    position: absolute;
    top: 40px;
    right: 8px;
}

.registroCont {
    box-shadow: 0px 0px 15px 0px rgb(180,180,180);
}
</style>
