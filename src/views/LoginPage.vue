<template>
  <div class="flex items-center justify-center loginBox">
    <img src="/public/images/login2.jpg" alt="" class="h-full loginLogo" loading="lazy" />
    <el-form
      :hide-required-asterisk="true"
      ref="loginFormRef"
      :model="formData"
      class="flex-auto p-6 shadow"
    >
      <p class="formTitle">
        即時人力平台
      </p>
      <el-form-item
        prop="userName"
        class="formInput"
      >
        <el-input
          v-model="formData.userName"
          autocomplete="off"
          placeholder="電子郵件或電話"
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
      <el-form-item>
        <div class="w-full flex justify-between">
          <el-checkbox v-model="formData.isAutoLogin">
            自動登入
          </el-checkbox>
          <a href="#" class="no-underline text-blue-500 hover:text-blue-700">
            忘記密碼?
          </a>
        </div>
      </el-form-item>
      <el-form-item class="formBtn">
        <el-button
          type="primary"
          class="w-full"
          @click="login">
          登入
        </el-button>
      </el-form-item>
      <el-form-item class="formBtn">
        <el-button
          type="success"
          class="w-1/2"
          @click="register">
          建立新帳號
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  userName: '',
  password: '',
  isAutoLogin: false
})

function login () {
}

function register () {
  router.push({ name: 'Register' })
}

// const rules = {
//   userName: [
//     { validator: validateUserName, trigger: 'change' }
//   ],
//   password: [
//     { validator: validatePassword, trigger: 'change' }
//   ]
// }

// function validateUserName (_rule: unknown, value: string, callback: (error?: string) => void) {
//   let isEmail = false
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
//   isEmail = emailRegex.test(value)

//   let isPhone = false
//   const regex = /^\d{10,15}$/
//   isPhone = regex.test(value)

//   if (isEmail || isPhone) {
//     callback()
//   } else {
//     callback('帳號格式錯誤')
//   }
// }

// function validatePassword(_rule: unknown, value: string, callback: (error?: string) => void) {
//   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

//   if (passwordRegex.test(value)) {
//     callback()
//   } else {
//     callback('密碼為8個字元，至少包含一個大寫英文字母、一個數字以及一個特殊符號')
//   }
// }
</script>

<style scoped>
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
  width: 100%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  text-align: center;

  .loginLogo {
    width: 50%;
    height: auto;
    margin-right: 2rem;
  }

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

@media screen and (max-width: 1024px) {
  .loginBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  text-align: center;

  .loginLogo {
    width: 60%;
    height: auto;
    margin-bottom: 2rem;
  }

  .el-form {
    width: 85%;

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

  .loginLogo {
    width: 70%;
    height: auto;
    margin-bottom: 2rem;
  }

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
