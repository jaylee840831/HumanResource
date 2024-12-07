<template>
  <div class="userPage">
    <div class="userContainer">
      <el-form
        :hide-required-asterisk="true"
        ref="formDom"
        :model="formData"
        :rules="rules"
        class="flex-auto p-6 shadow mb-6"
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
        <el-form-item class="formBtn">
          <el-button
            type="primary"
            class="w-1/2"
            @click="saveAccount">
            更新
          </el-button>
        </el-form-item>
      </el-form>
      <el-form
      :hide-required-asterisk="true"
      ref="passwordDom"
      :model="passwordData"
      :rules="passwordRules"
      class="flex-auto p-6 shadow"
      >
        <p class="formSubTitle">
          密碼
        </p>
        <el-form-item
          prop="password"
          class="formInput"
          :rules="passwordRules"
        >
          <el-input
            v-model="passwordData.password"
            autocomplete="off"
            placeholder="密碼"
          />
        </el-form-item>
        <el-form-item
          prop="checkPassword"
          class="formInput"
          :rules="passwordRules"
        >
          <el-input
            v-model="passwordData.checkPassword"
            autocomplete="off"
            placeholder="確認密碼"
          />
        </el-form-item>
        <el-form-item class="formBtn">
          <el-button
            type="primary"
            class="w-1/2"
            @click="savePassword">
            更新
          </el-button>
        </el-form-item>
        <p class="formSubTitle">
          刪除帳號
        </p>
        <el-form-item class="formBtn">
          <el-button
            type="info"
            class="w-1/2"
            @click="deleteAccount">
            刪除
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      v-model="isDialogVisible"
      :title="t('i18n.general.attention')"
      :close-on-click-modal="false"
    >
      <p v-if="dialogType === 'delete'">{{ t('i18n.user.delete') }}</p>
      <div class="flex justify-end">
        <div class="flex">
          <el-button
            @click="onCancel">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="onConfirm">
            確定
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { userForm, userFormUpdate } from '@/struct/form'
import { useI18n } from 'vue-i18n'
// import { useNotify } from '@/composables/useNotify'
import { getUserApi, updateUserApi, updatePasswordApi, deleteUserApi } from '@/api/user/index'
import { ElMessage } from 'element-plus'

const { t } = useI18n()
// const { notify } = useNotify()
const router = useRouter()
const dialogType = ref('')
const isDialogVisible = ref(false)
const userID = ref(window.localStorage.getItem('user_id') || '')
const formDom = ref()
const passwordDom = ref()
const formData = ref<userForm>({
  userName: '',
  phone: '',
  email: '',
  birthday: '',
  experience: '',
  selectedSkills: [],
  selectedLanguages: []
})
const passwordData = ref({
  password: '',
  checkPassword: ''
})

const openDialog = () => {
  isDialogVisible.value = true
}

const closeDialog = () => {
  dialogType.value = ''
  isDialogVisible.value = false
}

const onConfirm = () => {
  switch (dialogType.value) {
    case 'delete':
      deleteUserApi(userID.value)
        .then((res) => {
          ElMessage.success(t('i18n.general.deleteSuccess'))
          logout()
        }).catch((err) => {
        })
      break
    default:
      break
  }
  closeDialog()
}

const onCancel = () => {
  closeDialog()
}

function saveAccount () {
  formDom.value.validate((valid: boolean) => {
    if (valid) {
      const newForm = <userFormUpdate>{
        username: formData.value.userName,
        phone_number: formData.value.phone,
        email: formData.value.email,
        is_active: true,
        birth_date: formData.value.birthday
      }
      updateUserApi(userID.value, newForm)
        .then((res) => {
          window.localStorage.setItem('user_name', res?.data?.username)
          ElMessage.success(t('i18n.general.saveSuccess'))
          // notify('success', t('i18n.general.saveSuccess'), '')
        }).catch((err) => {
        })
    } else {
      return false
    }
  })
}

function deleteAccount () {
  dialogType.value = 'delete'
  openDialog()
}

function logout () {
  localStorage.clear()
  router.push('/')
}

function savePassword () {
  passwordDom.value.validate(async (valid: boolean) => {
    if (valid) {
      updatePasswordApi(userID.value, { password: passwordData.value.password })
        .then((res) => {
          // notify('success', t('i18n.general.saveSuccess'), '')
          ElMessage.success(t('i18n.general.saveSuccess'))
          logout()
        }).catch((err) => {
        })
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
  ]
}

const passwordRules = {
  password: [
    { validator: validatePassword, trigger: ['change'] }
  ],
  checkPassword: [
    { validator: validatePassword, trigger: ['change'] }
  ]
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
  else if (value.length !== 8) {
    callback('密碼為8個字元')
  }
  else if (passwordRegex.test(value) === false) {
    callback('至少包含一個大寫英文字母、一個數字以及一個特殊符號')
  }
  else if (passwordData.value.password !== passwordData.value.checkPassword) {
    callback('密碼與確認密碼需一致')
  }
  else {
    callback()
  }
}

function getUser () {
  getUserApi(userID.value)
    .then((res) => {
      const user = res.data
      formData.value.userName = user?.username
      formData.value.phone = user?.phone_number
      formData.value.email = user?.email
      formData.value.birthday = new Date(user?.birth_date).toISOString().split('T')[0]
    }).catch((err) => {
    })
}

onMounted(() => {
  getUser()
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
  flex-direction: column;
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
  flex-direction: column;
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
