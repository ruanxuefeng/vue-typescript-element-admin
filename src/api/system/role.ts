import request from '@/uitils/request';
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
    method: 'post',
    data: {id},
  });
}

export function allMenuList() {
  return request({
    url: '/role/menu/list',
    method: 'get',
  });
}

export function roleMenuList(id: string) {
  return request({
    url: '/role/menus',
    method: 'get',
    params: {id},
  });
}

export function updateMenuList(id: string, menuList: string[]) {
  return request({
    url: '/role/update/menuList',
    method: 'post',
    data: {id, menuList},
  });
}

export function roleList() {
  return request({
    url: '/role/all',
    method: 'get',
  });
}
