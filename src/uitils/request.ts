import axios from 'axios';
import store from '@/store';
import {Message} from 'element-ui';

import {getToken} from '@/uitils/auth';

// create an axios instance
const service = axios.create({
    // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_API,
    // send cookies when cross-domain requests
    withCredentials: true,
    // request timeout
    timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
    (config: any) => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = getToken();
        }
        return config;
    },
    (error: any) => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    },
);

// response interceptor
service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('err' + error); // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
