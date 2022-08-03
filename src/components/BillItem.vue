<script lang="ts" setup>
// const props = defineProps<{

// }>()
</script>

<template>
  <div class="bill-item">
    <div class="icon" i-carbon-cabin-care-alt text-green />
    <div class="info">
      <div class="name">
        购物
      </div>
      <div>10:36:00</div>
    </div>
    <div class="amount">
      <span>-</span>
      <span>38</span>
      <span class="decimal">.00</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.bill-item{
  display: flex;
  align-items: center;
  padding: .5rem;
  .icon{
    margin: .5rem;
    width: 2rem;
    height: 2rem;
    border: .5rem;
    color:red;
    // background-color: @primary-8;
  }
  .info{
    flex:1;
    color: @gray-1;
    font-size: small;
    .name{
      font-size: 1rem;
      color: @gray-10;
      font-weight: 600;
    }
  }
  .amount{
    font-size: x-large;
    color: @primary-0;
    .decimal{
      font-size: small;
    }
  }
}
</style>
