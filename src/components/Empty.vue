<script lang="ts" setup>
const { text = '没有更多了' } = defineProps({ text: String })
</script>

<template>
  <div class="empty">
    {{ text }}
  </div>
</template>

<style scoped lang="less">
.empty{
  margin: 1rem 0;
  text-align: center;
  font-size: small;
  color: @gray-1;
}
</style>
