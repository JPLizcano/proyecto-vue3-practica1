import { ref } from 'vue';

const visible = ref(false);
const tipo = ref('success');
const mensaje = ref('');
const duracion = ref(2500);

export function useAlert() {
    function showAlert(msg: string, type: string = 'success', time: number = 2500) {
        mensaje.value = msg;
        tipo.value = type;
        duracion.value = time;
        visible.value = true;

        setTimeout(() => {
            visible.value = false;
        }, duracion.value);
    }

    return {
        visible,
        tipo,
        mensaje,
        showAlert,
    };
}
