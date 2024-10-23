<template>
  <div class="appHeader">
    <el-page-header class="headerContainer">
      <template #content>
        <div class="routerContainer">
          <i class="bi bi-list drawerButton" @click="drawer = true"></i>
          <!-- 平板、電腦版router menu -->
          <el-menu
            class="routerMenu"
            mode="horizontal"
          >
            <div v-for="(m, index) in menuList" :key="index">
              <!-- 單層路由 -->
              <el-menu-item
                v-if="m.routerList.length === 0"
                :index="index"
                @click="router.push({ name: m.router })"
              >
                {{ m.title }}
              </el-menu-item>
              <!-- 多層路由 -->
              <el-sub-menu
                v-else
                :index="index"
              >
                <template #title>
                  {{ m.title }}
                </template>
                <div v-for="(r, index2) in m.routerList" :key="index2">
                  <el-menu-item
                    :index="index + '-' + index2"
                    v-if="r.routerList.length === 0"
                    @click="router.push({ name: r.router })"
                  >
                    {{ r.title }}
                  </el-menu-item>
                  <el-sub-menu
                    v-else
                    :index="index + '-' + index2"
                  >
                    <template #title>
                      {{ r.title }}
                    </template>
                    <el-menu-item
                      v-for="(r2, index3) in r.routerList" :key="index3" :index="index + '-' + index2 + '-' + index3"
                      @click="router.push({ name: r2.router })"
                    >
                      {{ r2.title }}
                    </el-menu-item>
                  </el-sub-menu>
                </div>
              </el-sub-menu>
            </div>
          </el-menu>
        </div>
      </template>
      <template #extra>
        <el-dropdown @command="handleUserCommand">
          <div class="dropdownTitle">
            <i class="bi bi-person-circle" style="font-size: 2rem;"></i>
            <span class="m-auto text-[18px] px-2">
              {{ userName }}
            </span>
          </div>
          <template v-slot:dropdown>
            <el-dropdown-menu v-for="item in userInfoList" :key="item">
              <el-dropdown-item :command="item.router">
                {{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-page-header>

    <!-- 行動裝置版router menu -->
    <el-drawer
      v-model="drawer"
      direction="ltr"
    >
      <el-menu>
        <div v-for="(m, index) in menuList" :key="index">
          <!-- 單層路由 -->
          <el-menu-item
            v-if="m.routerList.length === 0"
            :index="index"
            @click="clickToRouterChange(m.router)"
          >
            {{ m.title }}
          </el-menu-item>
          <!-- 多層路由 -->
          <el-sub-menu
            v-else
            :index="index"
          >
            <template #title>
              {{ m.title }}
            </template>
            <div v-for="(r, index2) in m.routerList" :key="index2">
              <el-menu-item
                :index="index + '-' + index2"
                v-if="r.routerList.length === 0"
                @click="clickToRouterChange(r.router)"
              >
                {{ r.title }}
              </el-menu-item>
              <el-sub-menu
                v-else
                :index="index + '-' + index2"
              >
                <template #title>
                  {{ r.title }}
                </template>
                <el-menu-item
                  v-for="(r2, index3) in r.routerList" :key="index3" :index="index + '-' + index2 + '-' + index3"
                  @click="clickToRouterChange(r2.router)"
                >
                  {{ r2.title }}
                </el-menu-item>
              </el-sub-menu>
            </div>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
// const currentActive = ref('Resume')
const drawer = ref(false)
const userName = ref('user')

const menuList = ref([
  {
    title: '任務',
    router: '',
    routerList: [
      {
        title: '任務列表',
        router: 'MissionList',
        routerList: []
      },
      {
        title: '建立任務',
        router: 'MissionCreate',
        routerList: []
      },
      {
        title: '我的任務',
        router: '',
        routerList: [
          {
            title: '已發布任務',
            router: 'MissonDeploy'
          },
          {
            title: '已儲存任務',
            router: 'MissonStore'
          },
          {
            title: '已應徵任務',
            router: 'MissonApply'
          }
        ]
      }
    ]
  },
  {
    title: '用戶資料',
    router: 'User',
    routerList: []
  },
  {
    title: '設定',
    router: '',
    routerList: [
      {
        title: '帳號設定',
        router: 'AccountSetting',
        routerList: []
      },
      {
        title: '通知設定',
        router: 'NotifySetting',
        routerList: []
      }
    ]
  }
])

const userInfoList = ref([
  {
    title: '登出',
    router: '',
    routerList: []
  }
])

function handleUserCommand (cmd: string) {
  switch (cmd) {
  case '':
    router.push('/')
    break
  default:
    break
  }
}

// watch(() => router.currentRoute.value.name, (newValue) => {
//   for(let i = 0; i < menuList.value.length; i++) {
//     if (menuList.value[i].router === newValue) {
//       currentActive.value = newValue
//       break
//     }
//   }
// }, { deep: true })

function clickToRouterChange(routerName: string | '') {
  drawer.value = false
  router.push({ name: routerName })
}
</script>

<style lang="scss" scoped>
  .headerContainer{
    position: relative;
    padding: 5px 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    i{
      font-size: 18px;
    }
    span{
    }
  }

  .routerContainer {
    display: flex;
    align-items: center;
  }

  .routerMenu {
    display: flex;
    max-width: 700px;
    min-width: 500px;
  }

  .functionMenu{
    display: flex;
    justify-content: flex-end;
    // max-width: 700px;
    min-width: 500px;
  }

  .drawerButton{
    display: none;
    font-size: 24px !important;
  }

  .el-menu {
    background-color: transparent !important;
    border: 1px transparent solid !important;
  }

  .el-menu .el-menu-item.is-active {
    // color: blue !important;
    // border-bottom: 3px solid  blue  !important;
  }

  .el-menu .el-menu-item {
    background-color: transparent !important;
    // color: blue !important;
    margin-right: 5px;
  }

  .el-menu .el-menu-item:hover {
    // border-bottom: 3px solid  blue  !important;
  }

  :deep(.el-page-header__back){
    display: none;
  }

  :deep(.el-divider){
    display: none;
  }

  .menuLinkActive{
    // color: blue;
  }

  .dropdownTitle{
    width: 100%;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }
  .dropdownTitle:hover{
    background-color: rgb(59 130 246 / 0.1);
  }
  .dropdownTitle img{
    width: 32px;
    height: 100%;
  }

  @keyframes slideIn {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }

  @media (max-width: 760px) {
    .routerMenu {
      display: none;
    }

    .drawerButton{
      display: flex;
      cursor: pointer;
      font-size: 24px !important;
    }
  }
</style>