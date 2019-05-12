import {MutationTree} from 'vuex';
import Cookies from 'js-cookie';

import State from './state';
import User from '@/store/types/User';

const mutations: MutationTree<State> = {
    setToken: ((state, token) => state.user.token = token),
    setUser: ((state, user: User) => state.user = user),
    setRoutes: ((state, routes) => state.user.routers = routes),
    toggleSidebar: (state) => {
        state.app.sidebar.opened = !state.app.sidebar.opened;
        state.app.sidebar.withoutAnimation = false;
        if (state.app.sidebar.opened) {
            Cookies.set('sidebarStatus', '1');
        } else {
            Cookies.set('sidebarStatus', '0');
        }
    },
};

export default mutations;
