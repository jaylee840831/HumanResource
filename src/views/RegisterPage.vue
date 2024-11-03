<template>
  <div class="centerContainer">
    <div class="flex items-center justify-center loginBox">
      <el-form
        :hide-required-asterisk="true"
        ref="loginFormRef"
        :model="formData"
        :rules="rules"
        class="flex-auto p-6 shadow"
      >
        <p class="formTitle">
          建立新帳號
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
        <el-form-item
          prop="password"
          class="formInput"
        >
          <el-input
            v-model="formData.password"
            autocomplete="off"
            placeholder="密碼"
          />
        </el-form-item>
        <el-form-item class="formBtn">
          <el-button
            type="primary"
            class="w-1/2"
            @click="register">
            註冊
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { registerForm } from '@/struct/form';

const formData = ref<registerForm>({
  userName: '',
  phone: '',
  email: '',
  birthday: '',
  password: ''
})

function register () {
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
  birthday: [
    { validator: validateBirthday, trigger: ['blur', 'change'] }
  ],
  password: [
    { validator: validatePassword, trigger: ['blur', 'change'] }
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
.loginBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  text-align: center;

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    .formTitle {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

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
      button {
        font-size: 1.125rem;
        padding: 1.125rem 1.5rem;
        border-radius: 10px;
      }
    }
  }
}

@media screen and (max-width: 760px) {
  .loginBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  text-align: center;

  .el-form {
    width: 100%;

    :deep(.el-form-item__content) {
      justify-content: center;
    }

    .formTitle {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

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
