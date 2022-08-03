<script lang="ts" setup>
const props = defineProps<{ title: string }>()
</script>

<template>
  <div class="topbar">
    <div>{{ props.title }}</div>
  </div>
</template>

<style scoped lang="less">
.topbar{
  font-weight: bold;
  font-size: large;
  padding: .5rem;
  text-align: center;
}
</style>
