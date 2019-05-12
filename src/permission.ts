import router from './router/index';
import store from './store/index';
import NProgress from 'nprogress'; // progress bar
// progress bar style
import 'nprogress/nprogress.css';
// get token from cookie
import {getToken} from '@/uitils/auth';
import getPageTitle from '@/uitils/get-page-title';
import User from '@/store/types/User';
import {Message} from 'element-ui';

NProgress.configure({showSpinner: false}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);
    // determine whether the user has logged in
    const hasToken = getToken();
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'});
            NProgress.done();
        } else {
            const isGetPermission = store.state.user && store.state.user.menus && store.state.user.menus.length > 0;
            if (isGetPermission) {
                next();
            } else {
                store.dispatch('getInfo')
                    .then((user: User) => {
                        const {menus} = user;
                        store.dispatch('generateRoutes', menus)
                            .then((accessRoutes) => {
                                router.addRoutes(accessRoutes);

                                next({...to, replace: true});
                            });
                    })
                    .catch((error) => {
                        Message.error('获取用户信息失败，返回登录页');
                        console.error(error);
                        next(`/login?redirect=${to.path}`);
                        NProgress.done();
                    });
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next();
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});
