import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/role/list',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/role/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/role/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/role/delete',
    method: 'post',
    data
  })
}

export function allMenuList() {
  return request({
    url: '/role/menu/list',
    method: 'get'
  })
}

export function roleMenuList(query) {
  return request({
    url: '/role/menus',
    method: 'get',
    params: query
  })
}

export function updateMenuList(data) {
  return request({
    url: '/role/update/menuList',
    method: 'post',
    data
  })
}

export function roleList(query) {
  return request({
    url: '/role/all',
    method: 'get',
    params: query
  })
}
