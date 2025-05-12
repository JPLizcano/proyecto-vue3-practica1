import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/HomeView.vue';
import Registro from '../view/RegistroView.vue';
import Perfil from '../view/PerfilView.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/registro', name: 'Registro', component: Registro },
    { path: '/perfil', name: 'Perfil', component: Perfil },
    { path: "/:pathMatch(.*)*", redirect: "/" }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
