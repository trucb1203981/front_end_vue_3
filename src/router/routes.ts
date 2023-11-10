export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            title: 'Home page',
            requiredAuth: true,
        },
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
            title: 'About page',
            requiredAuth: false,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
        meta: {
            title: 'Login page',
            requiredAuth: false,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
        meta: {
            title: 'Register page',
            requiredAuth: false,
        },
    },
    {
        path: '/thanks',
        name: 'thanks',
        component: () => import('@/views/ThanksView.vue'),
        meta: {
            title: 'Thanks page',
            requiredAuth: false,
        },
    },
    {
        path: '/games/wheelfortune',
        name: 'login',
        component: () => import('../views/games/WheelFortuneView.vue'),
        meta: {
            title: 'Wheel of Fortune',
            requiredAuth: true,
        },
    },
]
