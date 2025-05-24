import { ref } from 'vue';

const visible = ref(false);
const tipo = ref<'success' | 'error' | 'warning'>('success');
const mensaje = ref('');
const duracion = ref(2000);

let timeout: ReturnType<typeof setTimeout> | null = null;
let startTime: number;
let remaining: number;

export function useAlert() {
    function showAlert(msg: string, type: typeof tipo.value = 'success', time: number = 2000) {
        mensaje.value = msg;
        tipo.value = type;
        duracion.value = time;
        visible.value = true;

        if (timeout) clearTimeout(timeout);

        startTime = Date.now(); // Guardar cuándo inició
        remaining = duracion.value;

        timeout = setTimeout(() => {
            visible.value = false;
        }, duracion.value);
    }

    const pauseTimeout = () => {
        if (timeout) {
            clearTimeout(timeout);
            const elapsed = Date.now() - startTime; // cuánto ha pasado
            remaining -= elapsed; // restar lo transcurrido
        }
    }

    const resumeTimeout = () => {
        startTime = Date.now(); // nueva marca de tiempo
        timeout = setTimeout(() => {
            visible.value = false;
        }, remaining);
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
