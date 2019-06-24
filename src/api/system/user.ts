import request from '@/utils/request';
import Query from '@/class/Query';

export function list(query: Query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query,
  });
}

export function save(data: FormData) {
  return request({
    url: '/user/save',
    method: 'post',
    data,
  });
}

export function update(data: FormData) {
  return request({
    url: '/user/update',
    method: 'post',
    data,
  });
}

export function del(id: string) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params: {id},
  });
}

export function isUsernameExist(id: string, username: string) {
  return request({
    url: '/user/isUsernameExist',
    method: 'get',
    params: {id, username},
  });
}

export function userRoleList(id: string) {
  return request({
    url: '/user/roleIdList',
    method: 'get',
    params: {id},
  });
}

export function updateRole(id: string, roleIdList: string[]) {
  return request({
    url: '/user/updateRole',
    method: 'post',
    data: {id, roleIdList},
  });
}
