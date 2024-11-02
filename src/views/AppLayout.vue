<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- <transition name="router-fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition> -->
      <component :is="Component" :key="route.fullPath" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter-from,
.router-fade-leave-to {
  opacity: 0;
}

</style>
