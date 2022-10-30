<script lang="ts" setup>
const date = ref([1, 1, 0, 0])
</script>

<template>
  <div class="date">
    <div class="number-container">
      <div v-for="i in 10" :key="i" class="number">
        {{ i }}
      </div>
    </div>
    <div class="number-container">
      <div v-for="i in 10" :key="i" class="number">
        {{ i }}
      </div>
    </div>
    <div class="number-container">
      <div v-for="i in 10" :key="i" class="number">
        {{ i }}
      </div>
    </div>
    <div class="number-container">
      <div v-for="i in 10" :key="i" class="number">
        {{ i }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.date{
  position: relative;
  width: 100%;
  height: 8.6rem;
  padding: .5rem 0;
  display: flex;
  .number-container{
    padding: 2.4rem 0;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    flex: 1;
    // justify-content: space-evenly;
    text-align: center;
    .number{
      line-height: 2.4rem;
      border:1px solid #f1f1f1;
      margin: 0 .5rem;
    }
  }
  &::before{
    content: '';
    position: absolute;
    top: 50%;
    height: 2.8rem;
    width: 100%;
    transform: translateY(-50%);
    border: 1px solid #f2f2f2;
    background-color: rgba(200, 200, 200, 0.4);
    pointer-events: none;
  }
}
</style>
