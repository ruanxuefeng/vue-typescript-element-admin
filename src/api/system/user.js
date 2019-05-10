import request from '@/utils/request'

export function list(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}

export function save(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function del(data) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}

export function isEmailExist(user) {
  return request({
    url: '/user/isEmailExist',
    method: 'post',
    params: user
  })
}

export function isUsernameExist(user) {
  return request({
    url: '/user/isUsernameExist',
    method: 'post',
    params: user
  })
}

export function userRoleList(user) {
  return request({
    url: '/user/roleIdList',
    method: 'get',
    params: user
  })
}

export function updateRole(data) {
  return request({
    url: '/user/updateRole',
    method: 'post',
    data
  })
}
