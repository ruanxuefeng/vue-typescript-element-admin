import {GetterTree} from 'vuex';
import State from '@/store/state';
import Sidebar from '@/store/types/Sidebar';

const getters: GetterTree<State, any> = {
    sidebar(state): Sidebar {
        return state.app.sidebar;
    },
    device(state): string {
        return state.app.device;
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
