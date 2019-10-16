import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout/index.vue';
import RouteConfigImpl from '@/router/RouteRecordImpl';
import VueRouter from 'vue-router';

Vue.use(Router);

export const asyncRoutes: RouteConfigImpl[] = [
    {
        path: '/system',
        component: Layout,
        name: 'system',
        permissions: [
            'system',
            'system-role',
            'system-user',
            'system-user-list',
            'system-user-add',
            'system-user-update',
        ],
        meta: {
            title: '系统管理',
            icon: 'system',
        },
        children: [
            {
                path: 'user',
                component: () => import('@/views/user/index.vue'),
                name: 'User',
                permissions: ['system-user', 'system-user-list', 'system-user-add', 'system-user-update'],
                meta: {title: '用户管理', icon: 'user'},
            },
            {
                path: 'role',
                component: () => import('@/views/role/index.vue'),
                name: 'Role',
                permissions: ['system-role'],
                meta: {title: '角色管理', icon: 'role'},
            },
        ],
    },
    {
        path: '/book',
        component: Layout,
        name: 'Book',
        permissions: ['book', 'book-type'],
        redirect: '/book/index',
        meta: {
            title: '书籍',
            icon: 'book',
        },
        children: [
            {
                path: 'index',
                component: () => import('@/views/book/index.vue'),
                name: 'BookIndex',
                permissions: ['book'],
                meta: {
                    title: '书籍管理',
                    icon: 'book-manage',
                },
            },
            {
                path: 'type',
                component: () => import('@/views/book-type/index.vue'),
                name: 'BookType',
                permissions: ['book-type'],
                meta: {
                    title: '书籍类别管理',
                    icon: 'book-type',
                },
            },
        ],
    },
    {
        path: '/bulletin',
        component: Layout,
        name: 'Bulletin',
        permissions: ['bulletin'],
        redirect: '/bulletin/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/bulletin/index.vue'),
                name: 'BulletinIndex',
                permissions: ['bulletin'],
                meta: {
                    title: '公告',
                    icon: 'bulletin',
                },
            },
        ],
    },
    {
        path: '/log',
        component: Layout,
        name: 'Log',
        permissions: ['log'],
        redirect: '/log/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/log/index.vue'),
                name: 'LogIndex',
                permissions: ['log'],
                meta: {
                    title: '日志',
                    icon: 'log',
                },
            },
        ],
    },
    {
        path: '*',
        redirect: '/404',
        meta: {hidden: true},
    },
];

export const constantRoutes: RouteConfigImpl[] = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {title: '首页', icon: 'dashboard', affix: true},
            },
        ],
    },
    {
        path: '/login',
        hidden: true,
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/auth-redirect',
        hidden: true,
        component: () => import('@/views/login/auth-redirect.vue'),
    },
    {
        path: '/404',
        component: () => import('@/components/ErrorPage/404.vue'),
        name: 'Page404',
        hidden: true,
        meta: {
            title: '404',
            noCache: true,
        },
    },
];

const createRouter = () => new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher;
}

export default router;
