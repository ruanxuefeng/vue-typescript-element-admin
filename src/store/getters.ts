import {GetterTree} from 'vuex';
import State from '@/store/state';
import Sidebar from '@/store/types/Sidebar';

const getters: GetterTree<State, any> = {
    title(state): string {
        return state.settings.title;
    },
    tagsView(state): boolean {
        return state.settings.tagsView;
    },
    sidebar(state): Sidebar {
        return state.app.sidebar;
    },
    sidebarOpened(state) {
        return state.app.sidebar.opened;
    },
    device(state): string {
        return state.app.device;
    },
    routers(state) {
        return state.user.routers;
    },
    avatar(state) {
        return state.user.avatar;
    },
    name(state) {
        return state.user.name;
    },
    roles(state) {
        return state.user.roles;
    },
    showSettings(state): boolean {
        return state.settings.showSettings;
    },
    needTagsView(state): boolean {
        return state.settings.tagsView;
    },
    fixedHeader(state): boolean {
        return state.settings.fixedHeader;
    },
};
export default getters;
