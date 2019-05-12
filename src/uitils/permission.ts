/**
 * Use meta.role to determine if the current user has permission
 * @param menus
 * @param route
 */
function hasPermission(menus: string[], route: any) {
    if (route.meta && route.roles) {
        return menus.some((menu: string) => route.roles.includes(menu));
    } else {
        return true;
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menus
 */
export function filterAsyncRoutes(routes: any, menus: string[]) {
    const res: any = [];

    routes.forEach((route: any) => {
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
