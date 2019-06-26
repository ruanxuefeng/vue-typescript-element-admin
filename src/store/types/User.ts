import {getToken} from '@/utils/auth';
import RouteConfigImpl from '@/router/RouteRecordImpl';

export default class User {
    public token?: string = getToken();
    public name?: string;
    public email?: string;
    public gender?: string;
    public avatar?: string;
    public roles?: string[];
    public menus?: string[];

    public routers?: RouteConfigImpl[];
}
