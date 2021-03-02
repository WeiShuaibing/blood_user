import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function save(obj) {
  return request({
    url: BASE_URL + 'testreport/save',
    method: 'POST',
    data: obj
  })
}
