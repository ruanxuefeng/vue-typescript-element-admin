import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import Cookies from 'js-cookie';

import store from '@/store';
import Sidebar from '@/store/types/Sidebar';

interface App {
    $sidebar: Sidebar;
    $device: string;
    $size: string;
}

@Module({dynamic: true, store, name: 'app'})
export default class AppImpl extends VuexModule implements App {
    public $sidebar = new Sidebar(true);
    public $device: string = 'desktop';
    public $size: string = Cookies.get('size') || 'medium';

    @Action
    public toggleSideBar(withoutAnimation: boolean) {
        this.toggleSidebarMutation(withoutAnimation);
    }

    @Action
    closeSideBar(withoutAnimation: boolean) {
        this.closeSidebarMutation(withoutAnimation);
    }

    @Action
    toggleDevice(device: string) {
        this.toggleDeviceMutation(device);
    }

    @Action
    setSize(size: string) {
        this.setSizeMutation(size);
    }

    get sidebar(): Sidebar {
        return this.$sidebar;
    }

    get device(): string {
        return this.$device;
    }

    get size(): string {
        return this.$size;
    }

    @Mutation
    private toggleSidebarMutation(withoutAnimation: boolean) {
        this.$sidebar.opened = !this.$sidebar.opened;
        this.$sidebar.withoutAnimation = withoutAnimation;
        if (this.$sidebar.opened) {
            Cookies.set('sidebarStatus', '1');
        } else {
            Cookies.set('sidebarStatus', '0');
        }
    }

    @Mutation
    closeSidebarMutation(withoutAnimation: boolean) {
        Cookies.set('sidebarStatus', '0');
        this.$sidebar.opened = false;
        this.$sidebar.withoutAnimation = withoutAnimation;
    }

    @Mutation
    toggleDeviceMutation(device: string) {
        this.$device = device;
    }

    @Mutation
    setSizeMutation(size: string) {
        this.$size = size;
        Cookies.set('size', size);
    };

}

export const AppState = getModule(AppImpl);
