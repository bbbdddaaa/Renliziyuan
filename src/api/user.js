import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export const getUserDetailById = (id) => request({
  url: `/sys/user/${id}`,
  method: 'GET'
})

export const saveUserDetailById = (data) => {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

export const getEmployeesInfo = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}

export function logout() {

}
