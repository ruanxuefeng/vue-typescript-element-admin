import router from './router/index';
import store from './store/index';
import {Message} from 'element-ui';
import NProgress from 'nprogress'; // progress bar
// progress bar style
import 'nprogress/nprogress.css';
// get token from cookie
import {getToken} from '@/uitils/auth';
import getPageTitle from '@/uitils/get-page-title';

NProgress.configure({showSpinner: false}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();
    // set page title
    document.title = getPageTitle(to.meta.title);
    // determine whether the user has logged in
    const hasToken = getToken();
    console.info(hasToken);
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'});
            NProgress.done();
        } else {
            console.info(to);
            next();
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
