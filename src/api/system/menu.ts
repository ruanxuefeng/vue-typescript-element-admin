import request from '@/utils/request';
import Query from '@/class/Query';
import Menu from '@/views/system/menu/Menu';

export function list(query: Query) {
    return request({
        url: '/menu/list',
        method: 'get',
        params: query,
    });
}

export function save(data: Menu) {
    return request({
        url: '/menu/save',
        method: 'post',
        data,
    });
}

export function update(data: Menu) {
    return request({
        url: '/menu/update',
        method: 'post',
        data,
    });
}

export function del(id: string) {
    return request({
        url: '/menu/delete',
        method: 'post',
        data: {id},
    });
}

export function getParentList() {
    return request({
        url: '/menu/parent/list',
        method: 'get',
    });
}
