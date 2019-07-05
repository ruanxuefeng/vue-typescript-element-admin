export default class Sidebar {
    public opened!: boolean;
    public withoutAnimation: boolean = false;

    constructor(opened: boolean) {
        this.opened = opened;
    }
}
