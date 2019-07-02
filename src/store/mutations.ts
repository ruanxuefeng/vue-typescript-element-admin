import {MutationTree} from 'vuex';
import Cookies from 'js-cookie';

import State from './state';
import User from '@/store/types/User';
import {constantRoutes} from '@/router';

const mutations: MutationTree<State> = {
    setToken: ((state, token) => state.user.token = token),
    setUser: ((state, user: User) => state.user = user),
    setRoutes: ((state, routes) => {
        state.user.routers = constantRoutes.concat(routes);
    }),
    toggleSidebar: (state) => {
        state.app.sidebar.opened = !state.app.sidebar.opened;
        state.app.sidebar.withoutAnimation = false;
        if (state.app.sidebar.opened) {
            Cookies.set('sidebarStatus', '1');
        } else {
            Cookies.set('sidebarStatus', '0');
        }
    },
    addVisitedView: ((state, route) => {
        if (state.tagsView.visitedViews.some((item) => item.path === route.path)) {
            return;
        } else {
            state.tagsView.visitedViews.push(route);
        }
    }),
    addCachedView: ((state, route) => {
        if (state.tagsView.cachedViews.includes(route.name)) {
            return;
        }
        if (!route.meta.noCache) {
            state.tagsView.cachedViews.push(route.name);
        }
    }),
    delVisitedView: ((state, route) => {
        for (const [i, v] of state.tagsView.visitedViews.entries()) {
            if (v.path === route.path) {
                state.tagsView.visitedViews.splice(i, 1);
                break;
            }
        }
    }),
    delCachedView: ((state, route) => {
        for (const i of state.tagsView.cachedViews) {
            if (i === route.name) {
                const index = state.tagsView.cachedViews.indexOf(i);
                state.tagsView.cachedViews.splice(index, 1);
                break;
            }
        }
    }),
};

export default mutations;
