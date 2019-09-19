import request from '@/utils/request';
import Query from '@/class/Query';
import Role from '@/views/system/role/Role';

export function list(query: Query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query,
  });
}

export function save(data: Role) {
  return request({
    url: '/role/save',
    method: 'post',
    data,
  });
}

export function update(data: Role) {
  return request({
    url: '/role/update',
    method: 'post',
    data,
  });
}

export function del(id: string) {
  return request({
    url: '/role/delete',
    method: 'delete',
    params: {id},
  });
}

export function roleList() {
  return request({
    url: '/role/all',
    method: 'get',
  });
}

export function rolePermission(id: string) {
  return request({
    url: '/role/permissions',
    method: 'get',
    params: {id},
  });
}

export function permissionTree() {
  return request({
    url: '/role/permission/tree',
    method: 'get',
  });
}

export function updatePermission(id: string, permissions: string[]) {
  return request({
    url: '/role/update/permissions',
    method: 'post',
    data: {id, permissions},
  });
}
