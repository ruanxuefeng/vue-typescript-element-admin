import {MutationTree} from 'vuex';

import State from './state';

const mutations: MutationTree<State> = {
    SET_TOKEN: (state, token) => {
        state.user.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.user.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.user.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.user.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.user.roles = roles;
    },
};

export default mutations;
