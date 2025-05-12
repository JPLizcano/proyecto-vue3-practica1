import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import './assets/tailwind.css';

const app = createApp(App);

app.directive('click-outside', {
    beforeMount(el, binding) {
        el.clickOutsideEvent = (event: MouseEvent) => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
    }
})

app.use(router);
app.use(createPinia());
app.mount('#app');