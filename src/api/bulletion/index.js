import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/bulletin/list',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/bulletin/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/bulletin/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/bulletin/delete',
    method: 'post',
    data
  })
}

export function publish(data) {
  return request({
    url: '/bulletin/publish',
    method: 'post',
    data
  })
}
