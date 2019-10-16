import request from '@/utils/RequestUtils';
import Query from '@/class/Query';

export function list(query: Query) {
    return request({
        url: '/book/list',
        method: 'get',
        params: query,
    });
}

export function save(data: FormData) {
    return request({
        url: '/book/save',
        method: 'post',
        data,
    });
}

export function update(data: FormData) {
    return request({
        url: '/book/update',
        method: 'post',
        data,
    });
}

export function del(id: string) {
    return request({
        url: '/book/delete',
        method: 'delete',
        params: {id},
    });
}

export function statusList() {
    return request({
        url: '/book/status/list',
        method: 'get',
    });
}

export function getById(id: string) {
    return request({
        url: `/book/${id}`,
        method: 'get',
    });
}