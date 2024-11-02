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
          >
            <template #active-action>
              <i class="bi bi-fill" style="color:#313339"></i>
            </template>
            <template #inactive-action>
              <i class="bi bi-fill" style="color:#313339"></i>
            </template>
          </el-switch>
        </div>
        <div class="flex justify-between items-center mt-2">
          瀏覽器
          <el-button type="primary" @click="openBrowserNotify()">
            開啟通知
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const isEmailNotifyOn = ref(false)

watch(() => isEmailNotifyOn.value, (newValue) => {
  console.log(newValue)
}, { deep: true })

function openBrowserNotify () {
}
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
