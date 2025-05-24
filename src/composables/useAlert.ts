import { ref } from 'vue';

const visible = ref(false);
const tipo = ref<'success' | 'error' | 'warning'>('success');
const mensaje = ref('');
const duracion = ref(2500);

let timeout: ReturnType<typeof setTimeout>;
let startTime: number = Date.now();
let remaining = duracion.value;

export function useAlert() {
    function showAlert(msg: string, type: typeof tipo.value = 'success', time: number = 2500) {
        mensaje.value = msg;
        tipo.value = type;
        duracion.value = time;
        visible.value = true;

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            visible.value = false;
        }, duracion.value);
    }

    const pauseTimeout = () => {
        clearTimeout(timeout)
        remaining = Date.now() - startTime;
    }

    const resumeTimeout = () => {
        startTime = Date.now()
        timeout = setTimeout(() => {
            visible.value = false
        }, remaining)
    }

    return {
        visible,
        tipo,
        mensaje,
        duracion,
        showAlert,
        pauseTimeout,
        resumeTimeout
    };
}
