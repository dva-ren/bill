<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div class="nav">
    <RouterLink to="/" class="nav-item" :class="{ active: route.path === '/' }">
      <div class="icon" i-carbon-align-box-top-center />
      <div>记账</div>
    </RouterLink>
    <RouterLink to="/statistical" class="nav-item" :class="{ active: route.path === '/statistical' }">
      <div class="icon" i-carbon-chart-histogram />
      <div>统计</div>
    </RouterLink>
    <button class="add-btn">
      <div class="icon" i-carbon-add />
    </button>
    <RouterLink to="/other" class="nav-item" :class="{ active: route.path === '/other' }">
      <div class="icon" i-carbon-fade />
      <div>其他</div>
    </RouterLink>
    <RouterLink to="/mine" class="nav-item" :class="{ active: route.path === '/mine' }">
      <div class="icon" i-carbon-view-mode-2 />
      <div>我的</div>
    </RouterLink>
  </div>
</template>

<style scoped lang="less">
.nav{
  position: fixed;
  width: 100%;
  // height: 3rem;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  padding-top: .2rem;
  .nav-item{
    font-size: .6rem;
    padding: 0 .2rem;
    color: @gray-0;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: color .1s;
    .icon{
      font-size: large;
      padding-bottom: .1rem;
    }
  }
  .active{
    color:@primary-1;
  }
  .add-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @primary-0;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transform: translateY(-1rem);
    .icon{
      color:#fff;
    }
  }
}
</style>
