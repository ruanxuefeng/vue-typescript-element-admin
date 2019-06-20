import {getToken} from '@/utils/auth';

export default class User {
    public token?: string = getToken();
    public name!: string;
    public email!: string;
    public gender!: string;
    public avatar!: string;
    public roles!: string[];
    public menus!: string[];

    public routers!: any[];
}
