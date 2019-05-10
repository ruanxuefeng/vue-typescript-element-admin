import Cookies from 'js-cookie';

import Sidebar from '@/store/types/Sidebar';

export default class App {
    public sidebar!: Sidebar;
    public device: string = 'desktop';
    public size: string = Cookies.get('size') || 'medium';

    constructor() {
        const sidebarStatus = Cookies.get('sidebarStatus');
        this.sidebar = new Sidebar(sidebarStatus ? !!+sidebarStatus : true);
    }
}
