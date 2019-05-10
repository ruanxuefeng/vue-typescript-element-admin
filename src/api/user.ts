import request from '@/uitils/request';

export function login(data: object) {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  });
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  });
}

