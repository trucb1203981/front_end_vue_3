import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { getCookie } from 'typescript-cookie'

declare module 'vue-router' {
    interface RouteMeta {
        // is optional
        title?: string
        // must be declared by every route
        requiredAuth: boolean
    }
}

/** @description Create a new router instance.*/
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        } else {
            // always scroll to top
            return { top: 0 }
        }
    },
})

/** @description Middleware to check user authentication */
router.beforeEach((to, from, next) => {
    const isLoggedIn = getCookie('token')
    const authPages = ['/login', '/register']
    if (to.meta.requiredAuth) {
        if (isLoggedIn) {
            next()
        } else {
            next({ name: 'login', query: { redirect: to.fullPath } })
        }
    } else {
        if (isLoggedIn && authPages.includes(to.path)) {
            next({ name: 'home' })
        } else {
            next()
        }
    }
})

export default router
