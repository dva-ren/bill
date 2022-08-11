<script lang="ts" setup>
const props = defineProps({
  title: {
    required: true,
    type: String,
  },
  back: {
    required: false,
    default: false,
  },
  finish: {
    required: false,
    default: false,
  },
})
const emits = defineEmits(['onBack', 'onFinish'])
</script>

<template>
  <div class="topbar">
    <div>
      <button v-show="props.back" i-carbon-chevron-left class="back-btn" @click="emits('onBack')" />
    </div>
    <div class="title">
      {{ props.title }}
    </div>
    <div>
      <div v-show="props.finish" class="finish-btn" @click="emits('onFinish')">
        完成
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.topbar{
  font-size: large;
  padding: .5rem;
  display: flex;
  justify-content: space-between;
  div{
    min-width: 3rem;
  }
  .title{
    font-weight: bold;
    text-align: center;
  }
  .back-btn{
    font-size: 1.5rem;
    padding: .5rem 1rem;
  }
  .finish-btn{
    color: @primary-1;
  }
}
</style>
