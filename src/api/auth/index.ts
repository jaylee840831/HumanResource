import api from '@/plugins/axios'
import { loginForm } from '@/struct/form'

export async function loginApi (form: loginForm) {
  const login = await api.post(`/api/login/`, form)
  return login
}

export async function logoutApi () {
}