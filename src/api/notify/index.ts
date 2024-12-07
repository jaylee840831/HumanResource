import api from '@/plugins/axios'

export async function getNotifyApi (userID: string) {
  const notify = await api.get(`/api/get/notify/${userID}/`)
  return notify
}

export async function updateNotifyApi (userID: string, n: any) {
  const notify = await api.put(`/api/update/notify/${userID}/`, n)
  return notify
}