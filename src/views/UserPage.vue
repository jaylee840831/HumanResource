<template>
  <div class="userPage">
    <div class="userContainer">
      <el-form
        :hide-required-asterisk="true"
        ref="formDom"
        :model="formData"
        :rules="rules"
        class="flex-auto p-6 shadow"
      >
        <p class="formSubTitle">
          基本資料
        </p>
        <el-form-item
          prop="userName"
          class="formInput"
        >
          <el-input
            v-model="formData.userName"
            autocomplete="off"
            placeholder="姓名"
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
          />
        </el-form-item>
        <el-form-item
          prop="birthday"
          class="formInput"
        >
          <el-input
            type="date"
            v-model="formData.birthday"
            autocomplete="off"
            placeholder="出生日期"
          />
        </el-form-item>
        <p class="formSubTitle">
          經歷
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
            placeholder="請簡述您的工作經歷"
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div v-for="(l, index) in formData.selectedLanguages" :key="index">
            {{ showLanguage(l) }}
            <i class="bi bi-trash ml-2" style="font-size: 1.125rem; cursor: pointer;" @click="deleteLanguage(l)"></i>
          </div>
        </div>
        <el-form-item class="formBtn">
          <el-button
            type="primary"
            class="w-1/2"
            @click="saveUser">
            儲存
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface selectedLanguage {
  lan: string;
  level: string;
}

interface userForm {
  userName: string;
  phone: string;
  email: string;
  birthday: string;
  experience: string;
  selectedSkills: [];
  selectedLanguages: selectedLanguage[];
}

const formDom = ref()

const formData = ref<userForm>({
  userName: '',
  phone: '',
  email: '',
  birthday: '',
  experience: '',
  selectedSkills: [],
  selectedLanguages: []
})

// 群組選項(全部)
const skillGroup = ref([
  {
    label: '影片剪輯',
    value: 'video_clip'
  },
  {
    label: '企劃行銷',
    value: 'marketing_communication'
  }
])

const currentselectLanguage = ref<selectedLanguage>({
  lan: '',
  level: ''
})

const languageGroup = ref([
  {
    label: '英語',
    value: 'en'
  },
  {
    label: '中文',
    value: 'tw'
  },
  {
    label: '日文',
    value: 'jp'
  }
])

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

function saveUser () {
  formDom.value.validate((valid: boolean) => {
    if (valid) {
      alert('成功')
    } else {
      return false
    }
  })
}

const rules = {
  userName: [
    { validator: validateUserName, trigger: ['blur', 'change'] }
  ],
  phone: [
    { validator: validatePhone, trigger: ['blur', 'change'] }
  ],
  email: [
    { validator: validateEmail, trigger: ['blur', 'change'] }
  ],
  selectedSkills: [
    { validator: validateSelectedSkills, trigger: ['blur', 'change'] }
  ],
  birthday: [
    { validator: validateBirthday, trigger: ['blur', 'change'] }
  ],
  password: [
    { validator: validatePassword, trigger: ['blur', 'change'] }
  ]
}

function showLanguage (target: selectedLanguage) {
  const lanResult = languageGroup.value.find(item => target.lan === item.value)
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

function validateUserName (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value === '') {
    callback('不可為空')
  }
  else if (value.length > 0 && value.length <= 45) {
    callback()
  } else {
    callback('長度為1至45個字元')
  }
}

function validateSelectedSkills (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value.length <= 0) callback('至少選擇一項技能')
  callback()
}

function validatePhone (_rule: unknown, value: string, callback: (error?: string) => void) {
  let isPhone = false
  const regex = /^\d{10,15}$/
  isPhone = regex.test(value)

  if (value === '') {
    callback('不可為空')
  }
  else if (isPhone) {
    callback()
  } else {
    callback('格式錯誤')
  }
}

function validateEmail (_rule: unknown, value: string, callback: (error?: string) => void) {
  let isEmail = false
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  isEmail = emailRegex.test(value)

  if (value === '') {
    callback('不可為空')
  }
  else if (isEmail) {
    callback()
  } else {
    callback('格式錯誤')
  }
}

function validateBirthday (_rule: unknown, value: string, callback: (error?: string) => void) {
  if (value === '') {
    callback('不可為空')
  }
  else {
    callback()
  }
}

function validatePassword(_rule: unknown, value: string, callback: (error?: string) => void) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  if (value === '') {
    callback('不可為空')
  }
  else if (value.length > 8) {
    callback('密碼為8個字元')
  }
  else if (passwordRegex.test(value)) {
    callback()
  } else {
    callback('至少包含一個大寫英文字母、一個數字以及一個特殊符號')
  }
}
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
