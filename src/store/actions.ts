import {ActionTree} from 'vuex';

import State from './state';
import {removeToken, setToken} from '@/uitils/auth';
import {getInfo, login, logout} from '@/api/user';
import router, {resetRouter} from '@/router';


const actions: ActionTree<State, any> = {
    login({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            login({username, password}).then((response: any) => {
                const {data} = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve();
            }).catch((error: any) => {
                reject(error);
            });
        });
    },
    // get user info
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then((response: any) => {
                const {data} = response;

                if (!data) {
                    reject('Verification failed, please Login again.');
                }

                const {roleList, name, avatar, introduction} = data;

                commit('SET_ROLES', roleList);
                commit('SET_NAME', name);
                commit('SET_AVATAR', avatar);
                commit('SET_INTRODUCTION', introduction);
                resolve(data);
            }).catch((error: any) => {
                reject(error);
            });
        });
    },

    // user logout
    logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                removeToken();
                resetRouter();
                resolve();
            }).catch((error: any) => {
                reject(error);
            });
        });
    },
};

export default actions;
