import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/menu/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/menu/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/menu/delete',
    method: 'post',
    data
  })
}

export function getParentList() {
  return request({
    url: '/menu/parent/list',
    method: 'get'
  })
}
