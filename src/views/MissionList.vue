<template>
  <div class="missionList" v-loading="isLoading">
    <!-- search bar -->
    <div class="flex justify-center mt-5 mb-5">
      <div class="searchContainer">
        <el-input
          v-model="searchKeyWord"
          class="mr-5"
          placeholder="關鍵字(任務標題、地點)"
        >
        <template #prefix>
          <i class="bi bi-search"></i>
        </template>
        </el-input>
        <el-button type="success" @click="searchData()">搜尋</el-button>
      </div>
    </div>
    <!-- mission list -->
    <div class="listContainer" v-for="(m, index) in paginatedData" :key="index">
      <div class="w-full text-lg font-bold">
        {{ m.missionName }}
      </div>
      <div class="flex justify-between mt-5 text-lg font-bold">
        <div>{{ m.location }}</div>
        <div>{{ m.startday }} ~ {{ m.endday }}</div>
      </div>
      <div class="flex mt-5 text-lg font-bold">
        ${{ m.salaryType }}
        {{ m.salary }}
        {{ m.currency }}
      </div>
      <div class="w-full mt-5">
        {{ wordLimit(m.experience) }}
      </div>
      <div class="flex flex-wrap mt-5">
        <el-card shadow="always" class="mr-1" v-for="(s, index2) in m.selectedSkills" :key="index2">
          {{ s }}
        </el-card>
        <el-card shadow="always" class="mr-1" v-for="(l, index3) in m.selectedLanguages" :key="index3">
          {{ l.lan }} {{ l.level }}
        </el-card>
      </div>
    </div>
    <!-- <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-size="pageSize"
      :total="missionData.length"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { missionForm, searchItem } from '@/struct/form'
import { getAllMissionApi } from '@/api/mission/index'

let debounceTimeout: any
const currentPage = ref(1)
const pageSize = ref(5)
const searchKeyWord = ref('')
const pageCount = ref(1)
const totalNumber = ref(0)
const isLoading = ref(false)
const missionData = ref<missionForm[]>([])

// 切換頁數獲得的當前資料
const paginatedData = computed(() => {
  if (missionData.value.length > 0) {
    // const start = (currentPage.value - 1) * pageSize.value
    // const end = start + pageSize.value
    // return missionData.value.slice(start, end)
    return missionData.value
  }
  return []
})

// 頁碼變化
// const handleCurrentChange = (page: number) => {
//   // pageCount.value = pageCount.value + 1
//   getAllMissionApi({ page: pageCount.value })
//   .then((res) => {
//     const missions = res.data
//     if (missions.length > 0) {
//       for (let i = 0; i < missions.length; i++) {
//         const m = missions[i]

//         m.languages.forEach((element: { lan: string, level: string }) => {
//           switch (element.level) {
//             case '1':
//               element.level = '初級'
//               break
//             case '2':
//               element.level = '中等'
//               break
//             case '3':
//               element.level = '精通'
//               break
//             default:
//               break
//           }
//         })

//         missionData.value.push({
//           missionName: m.name,
//           startday: formatUTCTime(new Date(m.start_date)),
//           endday: formatUTCTime(new Date(m.end_date)),
//           salaryType: m.salary_type,
//           salary: m.salary,
//           currency: m.currency,
//           location: m.location,
//           userName: '',
//           phone: '',
//           email: '',
//           experience: m.detail,
//           selectedSkills: m.skills,
//           selectedLanguages: m.languages
//         })
//       }
//     }
//   }).catch((err) => {
//   })
//   currentPage.value = page
// }

// const state2 = ref('')

// const searchs = ref<searchItem[]>([])
// const querySearch = (queryString: string, cb: any) => {
//   const results = queryString
//     ? searchs.value.filter(createFilter(queryString))
//     : searchs.value
//   // call callback function to return suggestions
//   cb(results)
// }

// const createFilter = (queryString: string) => {
//   return (search: searchItem) => {
//     return (
//       search.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
//     )
//   }
// }
// const loadAll = () => {
//   return [
//     { value: '聰泰科技', link: 'https://github.com/vuejs/vue' },
//     { value: '聯發科', link: 'https://github.com/ElemeFE/element' },
//     { value: 'java', link: 'https://github.com/ElemeFE/cooking' },
//     { value: 'python', link: 'https://github.com/ElemeFE/mint-ui' },
//     { value: '台積電', link: 'https://github.com/vuejs/vuex' },
//     { value: '中信', link: 'https://github.com/vuejs/vue-router' },
//     { value: '中華郵政', link: 'https://github.com/babel/babel' }
//   ]
// }

// const handleSelect = (item: searchItem) => {
//   console.log(item)
// }

async function searchData () {
  pageCount.value = 1
  missionData.value = []
  getMissions()
}

function wordLimit (word: string) {
  if (word.length > 200) return `${word.substring(0, 200)}...`
  return word
}

function formatUTCTime(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0') // 月份從0開始，需加1
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 取得任務資料
async function getMissions () {
  getAllMissionApi({
    page: pageCount.value || 1,
    search_keyword: searchKeyWord.value || ''
  })
  .then((res) => {
    const missions = res.data.missions
    totalNumber.value = res.data.total

    if (missions.length > 0) {
      for (let i = 0; i < missions.length; i++) {
        const m = missions[i]

        m.languages.forEach((element: { lan: string, level: string }) => {
          switch (element.level) {
            case '1':
              element.level = '初級'
              break
            case '2':
              element.level = '中等'
              break
            case '3':
              element.level = '精通'
              break
            default:
              break
          }
        })

        missionData.value.push({
          missionName: m.name,
          startday: formatUTCTime(new Date(m.start_date)),
          endday: formatUTCTime(new Date(m.end_date)),
          salaryType: m.salary_type,
          salary: m.salary,
          currency: m.currency,
          location: m.location,
          userName: '',
          phone: '',
          email: '',
          experience: m.detail,
          selectedSkills: m.skills,
          selectedLanguages: m.languages
        })
      }
    }
    pageCount.value = pageCount.value + 1
  }).catch((err) => {
  })
}

async function handleScroll() {
  clearTimeout(debounceTimeout)
  // 設置新的延遲，防止事件觸發過於頻繁
  debounceTimeout = setTimeout(function() {    
    const scrollableDiv = document.getElementsByClassName('routerViewContainer')[0]
    // 當滑動到底部，搜尋下一頁資料
    if (Math.trunc(scrollableDiv.scrollHeight - scrollableDiv.scrollTop) === scrollableDiv.clientHeight) {
      if (missionData.value.length < totalNumber.value) {
        isLoading.value = true
        getMissions()
        setTimeout(() => {
          isLoading.value = false
        }, 1000)
      }
    }
  }, 500)
}

onMounted(async () => {
  watchEffect(() => {
    const r = document.getElementsByClassName('routerViewContainer')[0]
    r.addEventListener('scroll', handleScroll)
    return () => {
      r.removeEventListener('scroll', handleScroll)
    }
  })

  getMissions()
})
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
.listContainer {
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  margin: 1rem auto 1rem auto;
  width: 50%;
  padding: 1.5rem 2rem 1rem;
  color: #000;
  border: 1px lightgrey solid;
  border-radius: 5px;
  box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.1), /* 左下角陰影 */
    5px 5px 5px rgba(0, 0, 0, 0.1); /* 右下角陰影 */

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

.listContainer:hover{
  transform: scale(1.03);
}

:deep(.searchContainer){
  width: 50%;
  display: flex;
  align-items: center; 
  :deep(.el-input__inner) {
    height: 40px;
  }
}

@media screen and (max-width: 760px) {
  .listContainer {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 90%;
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

  .listContainer:hover{
    transform: none;
  }

  :deep(.searchContainer){
    width: 90%;
    display: flex;
    align-items: center; 
    :deep(.el-input__inner) {
      height: 40px;
    }
  }
}
</style>
