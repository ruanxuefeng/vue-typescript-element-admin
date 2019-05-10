import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout/index.vue';

Vue.use(Router);

export function resetRouter() {
    console.info('reset router');
}


export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    component: () => import('@/views/dashboard/index.vue'),
                    name: 'Dashboard',
                    meta: {title: 'Dashboard', icon: 'dashboard', affix: true},
                },
            ],
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/auth-redirect',
            component: () => import('@/views/login/auth-redirect.vue'),
        },
    ],
});
