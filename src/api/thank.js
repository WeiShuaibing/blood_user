import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function changeStatus(status) {
  return request({
    url: BASE_URL + 'thank/changeStatus',
    method: 'GET',
    params: {
      status
    }
  })
}
export function getMyThank() {
  return request({
    url: BASE_URL + 'thank/getMyThank',
    method: 'GET'
  })
}

