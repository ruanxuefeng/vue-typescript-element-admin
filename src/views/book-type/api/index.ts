import request from '@/utils/RequestUtils';
import Query from '@/class/Query';
import BookType from '@/views/book-type/BookType';

export function all() {
    return request({
        url: '/book/type/',
        method: 'get',
    });
}

export function list(query: Query) {
    return request({
        url: '/book/type//list',
        method: 'get',
        params: query,
    });
}

export function save(data: BookType) {
    return request({
        url: '/book/type//save',
        method: 'post',
        data,
    });
}

export function update(data: BookType) {
    return request({
        url: '/book/type/update',
        method: 'post',
        data,
    });
}

export function del(id: string) {
    return request({
        url: '/book/type/delete',
        method: 'delete',
        params: {id},
    });
}