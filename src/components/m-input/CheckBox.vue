<script lang="ts" setup>

</script>

<template>
  <div>
    <m-input label="分类">
      <template #suffix>
        <button i-carbon-caret-down class="drop-down-button" />
      </template>
    </m-input>
  </div>
</template>

<style scoped lang="less">
.choose-container{
  padding: 0 .6rem;
}
.drop-down-button{
  font-size: 1.2rem;
}
</style>
