import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import store from '@/store';
import elementVariables from '@/styles/element-variables.scss';
import DefaultSettings from '@/settings';

export interface Settings {
    $theme: string;
    $fixedHeader: boolean;
    $showSettings: boolean;
    $tagsView: boolean;
    $sidebarLogo: boolean;
    $title: string;
}

const defaultSettings = new DefaultSettings();

@Module({dynamic: true, store, name: 'settings'})
class SettingsImpl extends VuexModule implements Settings {
    public $theme = elementVariables.theme;
    public $fixedHeader = defaultSettings.fixedHeader;
    public $showSettings = defaultSettings.showSettings;
    public $tagsView = defaultSettings.tagsView;
    public $sidebarLogo = defaultSettings.sidebarLogo;
    public $title = defaultSettings.title;

    @Action
    public ChangeSetting(payload: { key: string, value: any }) {
        this.changeSetting(payload);
    }

    get theme(): any {
        return this.$theme;
    }

    get fixedHeader(): boolean {
        return this.$fixedHeader;
    }

    get showSettings(): boolean {
        return this.$showSettings;
    }

    get tagsView(): boolean {
        return this.$tagsView;
    }

    get sidebarLogo(): boolean {
        return this.$sidebarLogo;
    }

    get title(): string {
        return this.$title;
    }

    @Mutation
    private changeSetting(payload: { key: string, value: any }) {
        const {key, value} = payload;
        if (Object.prototype.hasOwnProperty.call(this, key)) {
            (this as any)[key] = value;
        }
    }
}

export const SettingsState = getModule(SettingsImpl);
