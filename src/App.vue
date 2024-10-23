<template>
  <AppHeader
    id="appHeader"
    v-if="router.name !== 'Main' && router.name !== 'Login' && router.name !== 'Register'"
  >
  </AppHeader>

  <router-view
    id="routerView"
    class="routerViewContainer"
    v-if="router.name !== 'Main' && router.name !== 'Login' && router.name !== 'Register'"
  >
  </router-view>

  <router-view v-else>
  </router-view>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'

const router = useRoute()

const handleResize = () => {
  setTimeout(() => {
    if (router.name !== 'Main' && router.name !== 'Login' && router.name !== 'Register') {
      if (document.getElementById('appHeader') && document.getElementById('routerView')) {
        const appHeader = document.getElementById('appHeader')
        const routerView = document.getElementById('routerView')
        routerView?.style.setProperty('height', `calc(100vh - ${ appHeader?.clientHeight }px)`)
        console.log(appHeader?.clientHeight, routerView?.clientHeight)
      }
    }
  }, 200)
}

watchEffect(() => {
  handleResize() // 初始先執行一次監聽視窗大小變化
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})

watch(() => router.name, (newValue) => {
  handleResize()
}, { deep: true })
</script>

<style scoped>
.routerViewContainer{
  width: 100%;
  height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
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
</style>
