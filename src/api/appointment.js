import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getMyAppointment() {
  return request({
    url: BASE_URL + 'appointment/getMyAppointment',
    method: 'GET'
  })
}
export function reback(id) {
  return request({
    url: BASE_URL + 'appointment/reback',
    method: 'GET',
    params: {
      id
    }
  })
}

export function save(obj) {
  return request({
    url: BASE_URL + 'appointment/save',
    method: 'POST',
    data: obj
  })
}

export function getMyBloodInfo() {
  return request({
    url: BASE_URL + 'appointment/getMyBloodInfo',
    method: 'GET'
  })
}

export function getMyBloodStatus() {
  return request({
    url: BASE_URL + 'appointment/getMyBloodStatus',
    method: 'GET'
  })
}

export function getBloodRecord() {
  return request({
    url: BASE_URL + 'appointment/getBloodRecord',
    method: 'GET'
  })
}

