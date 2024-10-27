<template>
  <div class="appHeader">
    <el-page-header class="headerContainer">
      <template #content>
        <div class="routerContainer">
          <i class="bi bi-list drawerButton" @click="drawer = true"></i>
          <!-- 平板、電腦版router menu -->
          <el-menu
            :default-active="routerActiveIndex"
            class="routerMenu"
            mode="horizontal"
          >
            <div v-for="(m, index) in menuList" :key="index">
              <!-- 單層路由 -->
              <el-menu-item
                v-if="m.routerList.length === 0"
                :index="index.toString()"
                :class="{ 'is-active': isActive(index.toString()) }"
                @click="clickToRouterChange(m.routerName, index.toString())"
              >
                <span>
                  {{ m.title }}
                </span>
              </el-menu-item>
              <!-- 多層路由 -->
              <el-sub-menu
                v-else
                :class="{ 'is-active': isActive(index.toString()) }"
                :index="index.toString()"
              >
                <template #title>
                  <span>
                    {{ m.title }}
                  </span>
                </template>
                <div v-for="(r, index2) in m.routerList" :key="index2">
                  <el-menu-item
                    v-if="r.routerList.length === 0"
                    :index="index.toString() + '-' + index2.toString()"
                    :class="{ 'is-active': isActive(index.toString() + '-' + index2.toString()) }"
                    @click="clickToRouterChange(r.routerName, `${index.toString()}-${index2.toString()}`)"
                  >
                    <span>
                      {{ r.title }}
                    </span>
                  </el-menu-item>
                  <!-- <el-sub-menu
                    v-else
                    :index="index + '-' + index2"
                  >
                    <template #title>
                      {{ r.title }}
                    </template>
                    <el-menu-item
                      v-for="(r2, index3) in r.routerList" :key="index3" :index="index + '-' + index2 + '-' + index3"
                      @click="clickToRouterChange(r2.routerName, `${index}-${index2}`)"
                    >
                      {{ r2.title }}
                    </el-menu-item>
                  </el-sub-menu> -->
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
              <el-dropdown-item :command="item.routerName">
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
            :index="index.toString()"
            :class="{ 'is-active': isActive(index.toString()) }"
            @click="clickToRouterChange(m.routerName, index.toString())"
          >
            <span>
              {{ m.title }}
            </span>
          </el-menu-item>
          <!-- 多層路由 -->
          <el-sub-menu
            v-else
            :index="index.toString()"
            :class="{ 'is-active': isActive(index.toString()) }"
          >
            <template #title>
              <span>
                {{ m.title }}
              </span>
            </template>
            <div v-for="(r, index2) in m.routerList" :key="index2">
              <el-menu-item
                v-if="r.routerList.length === 0"
                :index="index.toString() + '-' + index2.toString()"
                :class="{ 'is-active': isActive(index.toString() + '-' + index2.toString()) }"
                @click="clickToRouterChange(r.routerName, `${index}-${index2}`)"
              >
                <span>
                  {{ r.title }}
                </span>
              </el-menu-item>
              <!-- <el-sub-menu
                v-else
                :index="index + '-' + index2"
              >
                <template #title>
                  {{ r.title }}
                </template>
                <el-menu-item
                  v-for="(r2, index3) in r.routerList" :key="index3" :index="index + '-' + index2 + '-' + index3"
                  @click="clickToRouterChange(r2.routerName, `${index}-${index2}`)"
                >
                  {{ r2.title }}
                </el-menu-item>
              </el-sub-menu> -->
            </div>
          </el-sub-menu>
        </div>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const routerActiveIndex = ref('0-0')
const drawer = ref(false)
const userName = ref('user')

const menuList = ref([
  {
    title: '任務',
    routerName: 'Mission',
    routerList: [
      {
        title: '任務列表',
        routerName: 'MissionList',
        routerList: []
      },
      {
        title: '建立任務',
        routerName: 'MissionCreate',
        routerList: []
      }
      // {
      //   title: '我的任務',
      //   routerName: '',
      //   routerList: [
      //     {
      //       title: '已發布任務',
      //       routerName: 'MissonDeploy'
      //     },
      //     {
      //       title: '已儲存任務',
      //       routerName: 'MissonStore'
      //     },
      //     {
      //       title: '已應徵任務',
      //       routerName: 'MissonApply'
      //     }
      //   ]
      // }
    ]
  },
  {
    title: '用戶資料',
    routerName: 'User',
    routerList: []
  },
  {
    title: '設定',
    routerName: 'Setting',
    routerList: [
      {
        title: '帳號設定',
        routerName: 'AccountSetting',
        routerList: []
      },
      {
        title: '通知設定',
        routerName: 'NotifySetting',
        routerList: []
      }
    ]
  }
])

const userInfoList = ref([
  {
    title: '登出',
    routerName: '',
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

function isActive(index: string) {
  return routerActiveIndex.value.startsWith(index)
}

function clickToRouterChange(routerName: string | '', currentIndex: string | '') {
  routerActiveIndex.value = currentIndex
  drawer.value = false
  router.push({ name: routerName })
}
</script>

<style lang="scss" scoped>
  .is-active {
    .el-sub-menu__title span{
      color: #307bf4 !important;
    }
  }

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