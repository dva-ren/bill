<script setup lang="ts">
import { useMainStore } from './store'
const mainStore = useMainStore()
mainStore.init()
</script>

<template>
  <main text="gray-700 dark:gray-200">
    <router-view />
    <!-- <Footer /> -->
    <!-- <Navbar /> -->
  </main>
</template>

<style scoped lang="less">
main{
  font-family: "Noto Sans SC";
  background-color: @gray-bg;
  height: 100%;
}
</style>
