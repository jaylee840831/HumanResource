import api from '@/plugins/axios'
import { missionFormUpdate } from '@/struct/form'

export async function createMissionApi (form: missionFormUpdate) {
  const mission = await api.post(`/api/create/mission/`, form)
  return mission
}