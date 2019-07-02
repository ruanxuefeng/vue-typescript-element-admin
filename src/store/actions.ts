import {ActionTree} from 'vuex';

import State from './state';
import {getToken, removeToken, setToken} from '@/utils/auth';
import {getInfo, login, logout} from '@/api/user';
import {asyncRoutes} from '@/router';
import {filterAsyncRoutes} from '@/utils/permission';
import User from '@/store/types/User';


const actions: ActionTree<State, any> = {
    login({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username, password}).then((resp) => {
                const data = resp.data;
                const {token, menus} = data;

                const user: User = {token, menus};
                commit('setUser', user);
                setToken(data.token);
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    },
    // get user info
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then((response: any) => {
                const data = response.data;

                const {name, email, gender, avatar, roles, menus} = data;

                const token = getToken();

                const user = {token, name, email, gender, avatar, roles, menus};
                commit('setUser', user);

                resolve(user);
            }).catch((error: any) => {
                reject(error);
            });
        });
    },
    // user logout
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('setToken', '');
                // commit('setRoles', []);
                removeToken();
                resolve();
            }).catch((error: any) => {
                reject(error);
            });
        });
    },
    generateRoutes({commit}, menus) {
        return new Promise((resolve) => {
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus);
            commit('setRoutes', accessedRoutes);
            resolve(accessedRoutes);
        });
    },
    toggleSideBar({commit}) {
        commit('toggleSidebar');
    },
    addVisitedView({ commit }, view) {
        commit('addVisitedView', view);
    },
    addCachedView({ commit }, view) {
        commit('addCachedView', view);
    },
    addView({dispatch}, route) {
        dispatch('addVisitedView', route);
        dispatch('addCachedView', route);
    },
    delVisitedView({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('delVisitedView', view);
            resolve([...state.tagsView.visitedViews]);
        });
    },
    delCachedView({ commit, state }, view) {
        return new Promise((resolve) => {
            commit('delCachedView', view);
            resolve([...state.tagsView.cachedViews]);
        });
    },
    deleteView({ dispatch, state }, route) {
        return new Promise((resolve) => {
            dispatch('delVisitedView', route);
            dispatch('delCachedView', route);
            resolve({
                visitedViews: [...state.tagsView.visitedViews],
                cachedViews: [...state.tagsView.cachedViews],
            });
        });
    },
};

export default actions;
