/**
 * Use meta.role to determine if the current user has permission
 * @param menus
 * @param route
 */
import RouteConfigImpl from '@/router/RouteRecordImpl';

function hasPermission(menus: string[], route: RouteConfigImpl) {
    if (route.meta && route.permissions) {
        return menus.some((menu) => route.permissions ? route.permissions.includes(menu) : false);
    } else {
        return true;
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes: RouteConfigImpl[], menus: string[]) {
    const res: any = [];

    routes.forEach((route) => {
        const tmp = {...route};
        if (hasPermission(menus, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, menus);
            }
            res.push(tmp);
        }
    });

    return res;
}
