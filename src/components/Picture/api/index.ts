import axios from 'axios';
import {TOKEN_NAME} from '@/class/Constant';

import {getToken} from '@/utils/AuthUtils';

// create an axios instance
const service = axios.create({
    // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_URI,
    // send cookies when cross-domain requests
    withCredentials: true,
    // request timeout
    timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
    (config: any) => {
        // do something before request is sent
        config.headers[TOKEN_NAME] = getToken();
        return config;
    },
    (error: any) => {
        // do something with request error
        return Promise.reject(error);
    },
);

export function request(uri: string) {
    return service({
        url: uri,
        method: 'get',
        responseType: 'blob'
    });
}
