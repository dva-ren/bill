<script setup lang="ts">
const { content, show = false } = defineProps({ content: String, show: Boolean })
</script>

<template>
  <Teleport v-if="show" to="body">
    <div class="toast">
      {{ content }}
    </div>
  </Teleport>
</template>

<style lang="less">
.toast{
  position: absolute;
  left: 50%;
  bottom: 20%;
  transform: translateX(-50%);
}
</style>
