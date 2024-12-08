import api from '@/plugins/axios'

export async function getValuesApi(type: string) {
  const values = await api.get(`/api/get/values/${type}`)
  return values
}