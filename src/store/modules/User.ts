import {Action, getModule, Module, Mutation, VuexModule} from 'vuex-module-decorators';

import {getToken, removeToken, setToken} from '@/utils/auth';
import RouteConfigImpl from '@/router/RouteRecordImpl';
import RouteRecordImpl from '@/router/RouteRecordImpl';
import store from '@/store';
import {getInfo, login, logout} from '@/api/user';
import {filterAsyncRoutes} from '@/utils/permission';
import router, {asyncRoutes, constantRoutes, resetRouter} from '@/router';

export default interface User {
    id: string;
    token: string | undefined;
    name: string;
    email: string;
    gender: string;
    avatar: string;
    roles: string[];
    permissions: string[];
    routers: RouteConfigImpl[];
}

@Module({dynamic: true, store, name: 'user'})
class UserImpl extends VuexModule implements User {
    public id = '';
    public token: string | undefined = getToken();
    public name = '';
    public email = '';
    public gender = '';
    public avatar = '';
    public roles: string[] = [];
    public permissions: string[] = [];
    public routers: RouteConfigImpl[] = [];

    @Action
    public login(userInfo: any) {
        const {username, password} = userInfo;
        return new Promise((resolve) => {
            login({username, password}).then((resp) => {
                const data = resp.data;
                const {token} = data;

                this.SET_TOKEN(token);
                // this.SET_MENUS(menus);
                setToken(data.token);
                resolve();
            });
        });
    }

    @Action
    public getInfo() {
        return new Promise((resolve, reject) => {
            getInfo().then((response) => {
                const data = response.data;
                const {id, name, email, gender, avatar, roles, permissions} = data;
                this.SET_ID(id);
                this.SET_NAME(name);
                this.SET_EMAIL(email);
                this.SET_GENDER(gender);
                this.SET_AVATAR(avatar);
                this.SET_ROLES(roles);
                this.SET_PERMISSIONS(permissions);
                resolve(this.permissions);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    @Action
    public logout() {
        return new Promise((resolve) => {
            logout().then(() => {
                this.SET_TOKEN(undefined);
                removeToken();
                resetRouter();
                this.SET_PERMISSIONS([]);
                resolve();
            });
        });
    }

    @Action
    public generateRoutes(menus: string[]) {
        return new Promise((resolve) => {
            const accessedRoutes = filterAsyncRoutes(asyncRoutes, menus);
            this.SET_ROUTES(accessedRoutes);
            resolve(accessedRoutes);
        });
    }

    @Action
    public resetRouter() {
        this.getInfo().then((menus) => {
            resetRouter();
            this.generateRoutes((menus as string[])).then((routers) => {
                router.addRoutes((routers as RouteRecordImpl[]));
            });
        });
    }

    @Mutation
    private SET_ID(id: string) {
        this.id = id;
    }

    @Mutation
    private SET_TOKEN(token: string | undefined) {
        this.token = token;
    }

    @Mutation
    private SET_PERMISSIONS(permissions: string[]) {
        this.permissions = permissions;
    }

    @Mutation
    private SET_NAME(name: string) {
        this.name = name;
    }

    @Mutation
    private SET_EMAIL(email: string) {
        this.email = email;
    }

    @Mutation
    private SET_GENDER(gender: string) {
        this.gender = gender;
    }

    @Mutation
    private SET_AVATAR(avatar: string) {
        this.avatar = avatar;
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles;
    }

    @Mutation
    private SET_ROUTES(routes: RouteConfigImpl[]) {
        this.routers = constantRoutes.concat(routes);
    }
}

export const UserState = getModule(UserImpl);
