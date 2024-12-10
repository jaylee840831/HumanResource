<template>
  <div class="userPage">
    <div class="userContainer">
      <el-form
        :hide-required-asterisk="true"
        class="flex-auto p-6 shadow"
      >
        <p class="formSubTitle">
          通知
        </p>
        <div class="flex justify-between items-center mt-2">
          電子郵件
          <el-switch
            v-model="isEmailNotifyOn"
            inline-prompt
            style="--el-switch-on-color: #13ab67; --el-switch-off-color: lightgray"
          >
          </el-switch>
        </div>
        <div class="flex justify-between items-center mt-2">
          瀏覽器
          <el-switch
            v-model="isWebNotifyOn"
            inline-prompt
            style="--el-switch-on-color: #13ab67; --el-switch-off-color: lightgray"
          >
          </el-switch>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getNotifyApi, updateNotifyApi } from '@/api/notify/index'

const userID = ref(window.localStorage.getItem('user_id') || '')
const isEmailNotifyOn = ref(false)
const isWebNotifyOn = ref(false)

watch(() => isEmailNotifyOn.value, (newValue) => {
  updateNotifyApi(userID.value, { email: newValue })
  .then((res) => {
    // console.log(res)
  }).catch((err) => {
  })
}, { deep: true })

watch(() => isWebNotifyOn.value, (newValue) => {
  updateNotifyApi(userID.value, { web: newValue })
  .then((res) => {
    // console.log(res)
  }).catch((err) => {
  })
}, { deep: true })

function getNotify () {
  getNotifyApi(userID.value)
  .then((res) => {
    const notify = res.data
    isEmailNotifyOn.value = notify?.email
    isWebNotifyOn.value = notify?.web
  }).catch((err) => {
  })
}

onMounted(() => {
  getNotify()
})
</script>

<style scoped>
.userContainer {
  display: flex;
  margin: auto;
  width: 500px;
  height: 90dvh;
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
