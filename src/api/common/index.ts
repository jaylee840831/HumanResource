import api from '@/plugins/axios'

export async function getLanguagesApi() {
  const languages = await api.get(`/api/get/languages/`)
  return languages
}

export async function getSkillsApi() {
  const skills = await api.get(`/api/get/skills/`)
  return skills
}