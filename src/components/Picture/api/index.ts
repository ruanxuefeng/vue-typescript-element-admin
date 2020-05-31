import service from '@/utils/RequestUtils';

export function request(uri: string) {
    return service({
        url: uri,
        method: 'get',
        responseType: 'blob'
    });
}
