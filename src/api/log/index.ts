import request from '@/utils/RequestUtils';
import Query from '@/views/log/Query';

export function list(query: Query) {
    return request({
        url: '/log/list',
        method: 'get',
        params: query,
    });
}
