import api from '@/plugins/axios'
import { missionFormUpdate } from '@/struct/form'

export async function createMissionApi (form: missionFormUpdate) {
  const mission = await api.post(`/api/create/mission/`, form)
  return mission
}

export async function getAllMissionApi(form: any) {
  const mission = await api.post(`api/get/missions/`, form)
  return mission
}