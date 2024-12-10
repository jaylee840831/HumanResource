<template>
  <div class="missionEdit">
    <div class="userContainer">
      <el-form
        :hide-required-asterisk="true"
        ref="formDom"
        :model="formData"
        :rules="rules"
        class="flex-auto p-6 shadow"
      >
        <p class="formSubTitle">
          任務資料
        </p>
        <el-form-item
          prop="missionName"
          class="formInput"
        >
          <el-input
            v-model="formData.missionName"
            autocomplete="off"
            placeholder="標題"
          />
        </el-form-item>
        <el-form-item
          prop="startday"
          class="formInput"
          label="開始時間"
        >
          <el-input
            type="datetime-local"
            v-model="formData.startday"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="endday"
          class="formInput"
          label="結束時間"
        >
          <el-input
            type="datetime-local"
            v-model="formData.endday"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="salaryType"
          class="formInput"
        >
          <el-select
            v-model="formData.salaryType"
            placeholder="薪酬類型"
            class="mr-2"
          >
            <el-option
              v-for="item in timeGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="currency"
          class="formInput"
        >
          <el-select
            v-model="formData.currency"
            placeholder="幣別"
          >
            <el-option
              v-for="item in currencyGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="salary"
          class="formInput"
        >
          <el-input
            placeholder="薪資"
            v-model="formData.salary"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          prop="location"
          class="formInput"
        >
          <el-input
            v-model="formData.location"
            autocomplete="off"
            placeholder="地點"
          />
        </el-form-item>
        <p class="formSubTitle">
          任務內容
        </p>
        <el-form-item
          prop="experience"
          class="formInput">
          <el-input
            type="textarea"
            :rows="18"
            maxlength="4000"
            show-word-limit
            v-model="formData.experience"
            placeholder="請簡述您的任務內容"
          ></el-input>
        </el-form-item>
        <p class="formSubTitle">
          技能
        </p>
        <el-form-item
          prop="selectedSkills"
        >
          <el-select
            v-model="formData.selectedSkills"
            multiple
            placeholder="選擇技能"
          >
            <el-option
              v-for="item in skillGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <p class="formSubTitle">
          語言能力
        </p>
        <div class="flex">
          <el-select
            v-model="currentselectLanguage.lan"
            placeholder="語言"
            class="mr-2"
          >
            <el-option
              v-for="item in languageGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="currentselectLanguage.level"
            placeholder="等級"
          >
            <el-option
              v-for="item in levelGroup"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <i class="bi bi-plus" style="font-size: 1.5rem; cursor: pointer;" @click="addLanguage(currentselectLanguage)"></i>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <el-card shadow="always" class="flex justify-center" v-for="(l, index) in formData.selectedLanguages" :key="index">
            {{ showLanguage(l) }}
            <i class="bi bi-trash ml-2" style="font-size: 1.125rem; cursor: pointer;" @click="deleteLanguage(l)"></i>
          </el-card>
        </div>
        <p class="formSubTitle">
          發布者資料
        </p>
        <el-form-item
          prop="userName"
          class="formInput"
        >
          <el-input
            v-model="formData.userName"
            autocomplete="off"
            placeholder="姓名"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item
          prop="phone"
          class="formInput"
        >
          <el-input
            v-model="formData.phone"
            autocomplete="off"
            placeholder="電話"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item
          prop="email"
          class="formInput"
        >
          <el-input
            v-model="formData.email"
            autocomplete="off"
            placeholder="電子郵件"
            :disabled="isDisabled"
          />
        </el-form-item>
        <el-form-item class="formBtn">
          <el-button
            type="success"
            class="w-1/2"
            @click="saveData">
            儲存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { missionForm, missionFormUpdate, selectedLanguage } from '@/struct/form'
import { createMissionApi } from '@/api/mission/index'
import { getUserApi } from '@/api/user/index'
import { getValuesApi } from '@/api/common/index'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const isDisabled = ref(true)
const userID = ref(window.localStorage.getItem('user_id') || '')
const formDom = ref()
const formData = ref<missionForm>({
  missionName: '',
  startday: '',
  endday: '',
  salaryType: '',
  currency: '',
  salary: '',
  location: '',
  userName: '',
  phone: '',
  email: '',
  experience: '',
  selectedSkills: [],
  selectedLanguages: []
})
// 技能選項(全部)
const skillGroup = ref<any>([])
const currentselectLanguage = ref<selectedLanguage>({
  lan: '',
  level: ''
})
// 語言選項(全部)
const languageGroup = ref<any>([])
const levelGroup = ref([
  {
    label: '初級',
    value: '1'
  },
  {
    label: '中等',
    value: '2'
  },
  {
    label: '精通',
    value: '3'
  }
])
const timeGroup = ref<any>([])
const currencyGroup = ref<any>([])

function saveData () {
  formDom.value.validate((valid: boolean) => {
    if (valid) {
      const newForm = <missionFormUpdate> {
        name: formData.value.missionName,
        start_date: formData.value.startday,
        end_date: formData.value.endday,
        salary_type: formData.value.salaryType,
        salary: formData.value.salary,
        currency: formData.value.currency,
        location: formData.value.location,
        detail: formData.value.experience,
        user: Number(userID.value),
        skills: formData.value.selectedSkills,
        languages: formData.value.selectedLanguages
      }
      createMissionApi(newForm)
      .then((res) => {
        ElMessage.success(t('i18n.general.saveSuccess'))
      }).catch((err) => {
      })
    } else {
      return false
    }
  })
}

const rules = {
  missionName:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  startday:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  endday:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  salaryType:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  currency:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  salary: [
    { validator: validateNumber, trigger: ['blur', 'change'] }
  ],
  location:[
    { validator: validateEmpty, trigger: ['blur', 'change'] }
  ],
  experience:[
    { validator: validateExperience, trigger: ['blur', 'change'] }
  ],
  selectedSkills: [
    { validator: validateSelectedSkills, trigger: ['blur', 'change'] }
  ]
}

function showLanguage (target: selectedLanguage) {
  const lanResult = languageGroup.value.find((item: { value: string }) => target.lan === item.value)
  const levelResult = levelGroup.value.find(item => target.level === item.value)
  return `${lanResult?.label} ${levelResult?.label}`
}

function deleteLanguage (target: selectedLanguage) {
  if (target.lan !== '' && target.level !== '') {
    formData.value.selectedLanguages = formData.value.selectedLanguages.filter(item =>
      JSON.stringify(target) !== JSON.stringify(item)
    )
  }
}

function addLanguage (target: selectedLanguage) {
  if (target.lan !== '' && target.level !== '') {
    const findResult = formData.value.selectedLanguages.find(item => target.lan === item.lan)
    if (findResult === undefined) formData.value.selectedLanguages.push(JSON.parse(JSON.stringify(target)))
    // console.log(formData.value.selectedLanguages)
  }
}

function validateSelectedSkills (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value.length <= 0) callback('至少選擇一項技能')
  callback()
}

function validateEmpty (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value === '') callback('不可為空')
  callback()
}

function validateNumber (_rule: unknown, value: string, callback: (error?: string) => void) {
  const numberValue = Number(value)
  if (value === '') callback('不可為空')
  else if (Number.isInteger(numberValue) && numberValue > 0) callback()
  callback('必須是大於0的數字')
}

function validateExperience (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value === '') callback('不可為空')
  callback()
}

function getUser () {
  getUserApi(userID.value)
    .then((res) => {
      const user = res.data
      formData.value.userName = user?.username
      formData.value.phone = user?.phone_number
      formData.value.email = user?.email
    }).catch((err) => {
    })
}

function getAllLanguages () {
  getValuesApi('language')
  .then((res) => {
      const languages = res.data
      if (languages.length > 0) {
        for (let i = 0; i < languages.length; i++) {
          languageGroup.value.push({
            label: languages[i]?.value_tw,
            value: languages[i]?.value
          })
        }
      }
    }).catch((err) => {
    })
}

function getAllSkills () {
  getValuesApi('skill')
  .then((res) => {
      const skills = res.data
      if (skills.length > 0) {
        for (let i = 0; i < skills.length; i++) {
          skillGroup.value.push({
            label: skills[i]?.value_tw,
            value: skills[i]?.value
          })
        }
      }
    }).catch((err) => {
    })
}

function getAllTimeType () {
  getValuesApi('time')
  .then((res) => {
      const times = res.data
      if (times.length > 0) {
        for (let i = 0; i < times.length; i++) {
          timeGroup.value.push({
            label: times[i]?.value_tw,
            value: times[i]?.value
          })
        }
      }
    }).catch((err) => {
    })
}

function getAllCurrency () {
  getValuesApi('currency')
  .then((res) => {
      const currency = res.data
      if (currency.length > 0) {
        for (let i = 0; i < currency.length; i++) {
          currencyGroup.value.push({
            label: currency[i]?.value_tw,
            value: currency[i]?.value
          })
        }
      }
    }).catch((err) => {
    })
}

onMounted(() => {
  getUser()
  getAllLanguages()
  getAllSkills()
  getAllTimeType()
  getAllCurrency()
})
</script>

<style scoped>
.centerContainer {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.userContainer {
  display: flex;
  margin: auto;
  width: 500px;
  padding: 1.5rem 2rem 1rem;
  color: #000;

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    /* .formSubTitle {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .formSubTitle:not(:first-child){
      margin-top: 2rem;
    } */

    .formInput {
      margin-bottom: 1.75rem;

      :deep(.el-input) {
        width: 100%;
      }

      :deep(.el-input__wrapper) {
        padding: 0;
        border-radius: 15px;
        overflow: hidden;
      }

      :deep(.el-input__inner) {
        height: 2.25em;
        font-size: 1.125rem;
        padding: 2px 11px;;

        &::placeholder {
          text-align: left;
        }
      }
    }

    .formBtn {
      margin-top: 1.75rem;
      button {
        font-size: 1.125rem;
        padding: 1.125rem 1.5rem;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 760px) {
  .userContainer {
  display: flex;
  margin: auto;
  width: 100%;
  padding: 1.5rem 2rem 1rem;
  color: #000;

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    /* .formSubTitle {
      font-size: 1.125rem;
      margin-bottom: 0.5rem;
    }

    .formSubTitle:not(:first-child){
      margin-top: 2rem;
    } */

    .formInput {
      margin-bottom: 1.75rem;

      :deep(.el-input) {
        width: 100%;
      }

      :deep(.el-input__wrapper) {
        padding: 0;
        border-radius: 15px;
        overflow: hidden;
      }

      :deep(.el-input__inner) {
        height: 2.25em;
        font-size: 1.125rem;
        padding: 2px 11px;;

        &::placeholder {
          text-align: left;
        }
      }
    }

    .formBtn {
      margin-top: 1.75rem;
      button {
        font-size: 1.125rem;
        padding: 1.125rem 1.5rem;
        border-radius: 10px;
      }
    }
  }
}
}
</style>
