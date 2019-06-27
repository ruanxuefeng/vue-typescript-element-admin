import request from '@/utils/request';
import BulletinQuery from '@/views/bulletin/Query';
import Bulletin from '@/views/bulletin/Bulletin';

export function list(query: BulletinQuery) {
    return request({
        url: '/bulletin/list',
        method: 'get',
        params: query,
    });
}

export function save(data: Bulletin) {
    return request({
        url: '/bulletin/save',
        method: 'post',
        data,
    });
}

export function update(data: Bulletin) {
    return request({
        url: '/bulletin/update',
        method: 'post',
        data,
    });
}

export function del(id: string) {
    return request({
        url: '/bulletin/delete',
        method: 'post',
        params: {id},
    });
}

export function publish(id: string) {
    return request({
        url: '/bulletin/publish',
        method: 'post',
        params: {id},
    });
}
