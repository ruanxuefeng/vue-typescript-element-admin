import request from '@/utils/RequestUtils';
import Query from '@/class/Query';
import ScheduledTask from '@/views/scheduled-task/class/ScheduledTask';

export function list(query: Query) {
    return request({
        url: '/scheduled/task/list',
        method: 'get',
        params: query,
    });
}

export function save(data: ScheduledTask) {
    const {name, corn, bean, memo} = data;
    return request({
        url: '/scheduled/task/save',
        method: 'post',
        data: {name, corn, bean, memo}
    });
}

export function update(data: ScheduledTask) {
    return request({
        url: '/scheduled/task/update',
        method: 'post',
        data,
    });
}

export function updateStatus(id: string) {
    return request({
        url: '/scheduled/task/update/status',
        method: 'post',
        params:{id}
    });
}

export function del(id: string) {
    return request({
        url: '/scheduled/task/delete',
        method: 'delete',
        params: {id},
    });
}

export function trigger(id: string) {
    return request({
        url: '/scheduled/task/trigger',
        method: 'put',
        params: {id},
    });
}
