<template>
  <div class="centerContainer">
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
        <!-- <el-form-item>
          <div class="w-full flex justify-between">
            <div></div>
            <a href="#" class="no-underline text-blue-500 hover:text-blue-700">
              忘記密碼?
            </a>
          </div>
        </el-form-item> -->
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref({
  userName: '',
  password: ''
})

function login () {
  router.push({ name: 'MissionList' })
}

function register () {
  router.push({ name: 'Register' })
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
  width: 60%;
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
  width: 70%;
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

@media screen and (min-width: 1920px) {
  .loginBox {
  display: flex;
  width: 50%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  text-align: center;

  .loginLogo {
    width: 40%;
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
}
</style>
