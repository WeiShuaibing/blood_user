import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function login(data) {
  return request({
    url: BASE_URL + 'user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: BASE_URL + 'user/info',
    method: 'get'
  })
}

export function getUserById(id) {
  return request({
    url: BASE_URL + 'user/getUserById',
    method: 'get',
    params: {
      id
    }
  })
}

export function logout() {
  return request({
    url: BASE_URL + 'user/logout',
    method: 'post'
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'user/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}

export function save(user) {
  return request({
    url: BASE_URL + 'user/save',
    method: 'POST',
    data: user
  })
}

export function deleteById(id) {
  return request({
    url: BASE_URL + 'user/deleteById',
    method: 'GET',
    params: {
      id
    }
  })
}

export function search(pageNum, pageSize, matchStr) {
  return request({
    url: BASE_URL + 'user/search',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      matchStr
    }
  })
}

export function update(user) {
  return request({
    url: BASE_URL + 'user/update',
    method: 'POST',
    data: user
  })
}

export function getById(id) {
  return request({
    url: BASE_URL + 'user/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
export function searchByName(matchStr) {
  return request({
    url: BASE_URL + 'user/searchByName',
    method: 'GET',
    params: {
      matchStr
    }
  })
}

export function getBloodInfo() {
  return request({
    url: BASE_URL + 'user/getBloodInfo',
    method: 'GET'
  })
}
