import variables from '@/styles/element-variables.scss';

export default class Settings {
    public theme: string = variables.theme;

    public title: string = 'Vue Element Admin';

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    public showSettings: boolean = true;

    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    public tagsView: boolean = true;

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    public fixedHeader: boolean = false;

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    public sidebarLogo: boolean = false;

    /**
     * @type {string | array} 'production' | ['production'; 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev; you can pass ['production'; 'development']
     */
    public errorLog: string = 'production';
}
