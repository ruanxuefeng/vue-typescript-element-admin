import request from '@/utils/RequestUtils';
import Query from '@/class/Query';
import BookChapter from '@/views/book-detail/class/BookChapter';

export function list(query: Query) {
    return request({
        url: '/book/chapter/list',
        method: 'get',
        params: query,
    });
}

export function save(data: BookChapter) {
    return request({
        url: '/book/chapter//save',
        method: 'post',
        data,
    });
}

export function update(data: BookChapter) {
    return request({
        url: '/book/chapter/update',
        method: 'post',
        data,
    });
}

export function getById(id: string) {
    return request({
        url: `/book/chapter/${id}`,
        method: 'get',
    });
}