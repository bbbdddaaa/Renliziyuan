import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params
  })
}

export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function updataRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  })
}

export function deleteRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'DELETE'
  })
}

export function getCompanyInfo(companyId) {
  return request({
    url: `company/${companyId}`
  })
}
