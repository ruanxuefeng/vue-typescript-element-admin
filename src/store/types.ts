import {getToken} from '@/uitils/auth';

export class User {
    public token?: string = getToken();
    public name: string = '阮雪峰';
    public avatar!: string;
    public introduction: string = '';
    public roles!: string[];
}


