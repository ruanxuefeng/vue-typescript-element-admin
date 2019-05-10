import {getToken} from '@/uitils/auth';

export default class User {
    public token?: string = getToken();
    public name!: string;
    public avatar!: string;
    public introduction: string = '';
    public roles!: string[];
}
