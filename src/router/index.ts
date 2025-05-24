import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/HomeView.vue';
import Registro from '../view/RegistroView.vue';
import Perfil from '../view/PerfilView.vue';
// import Pruebas from "../view/pruebas.vue";
import { useAuthStore } from '../store/useAuthStore';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/registro', name: 'Registro', component: Registro },
    { path: '/perfil', name: 'Perfil', component: Perfil, meta: { requiresAuth: true } },
    // { path: '/pruebas', name: 'Pruebas', component: Pruebas, meta: { requiresAuth: true } },
    { path: "/:pathMatch(.*)*", redirect: "/" }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth) {
        await authStore.checkSession();
        if (!authStore.isAuthenticated) {
            return next('/'); // Redirige al Home si no está autenticado
        }
    }

    if (to.name === "Registro") {
        await authStore.checkSession();
        if (authStore.isAuthenticated) {
            return next('/');
        }
    }
    next();
});

export default router;
