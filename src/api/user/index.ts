import api from '@/plugins/axios'
import { registerForm, userFormUpdate } from '@/struct/form'

export async function registerApi (form: registerForm) {
  const register = await api.post(`/api/create/user/`, form)
  return register
}

export async function getUserApi(id: string) {
  const user = await api.get(`/api/get/user/${id}/`)
  return user
}

export async function getUserProfileApi(userID: string) {
  const profile = await api.get(`api/get/user/profile/${userID}/`)
  return profile
}

export async function deleteUserApi(id: string) {
  const user = await api.delete(`/api/delete/user/${id}/`)
  return user
}

export async function updateUserApi(id: string, form: userFormUpdate) {
  const user = await api.put(`/api/update/user/${id}/`, form)
  return user
}

export async function updateUserProfileApi(id: string, p: any) {
  const profile = await api.put(`api/update/user/profile/${id}/`, p)
  return profile
}

export async function updatePasswordApi(id: string, p: string) {
  const password = await api.put(`/api/update/user/${id}/password`, p)
  return password
}