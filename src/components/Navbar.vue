<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const showPopup = ref(false)

const go = (path: string) => {
  router.push(path)
  showPopup.value = false
}
</script>

<template>
  <div class="nav">
    <RouterLink to="/" class="nav-item" :class="{ active: route.path === '/' }">
      <div class="icon" i-carbon-align-box-top-center />
      <div>账单</div>
    </RouterLink>
    <RouterLink to="/manyBills" class="nav-item" :class="{ active: route.path === '/manyBills' }">
      <div class="icon" i-carbon-fade />
      <div>多人账单</div>
    </RouterLink>
    <div class="add-btn">
      <div class="icon" :class="{ 'rote-icon': showPopup }" i-carbon-add @click="showPopup = !showPopup" />
      <button v-show="showPopup" class="popup-btn left-btn" @click="go('/add')">
        普通账单
      </button>
      <button v-show="showPopup" to="/add" class="popup-btn right-btn" @click="go('/add')">
        多人账单
      </button>
    </div>
    <RouterLink to="/statistical" class="nav-item" :class="{ active: route.path === '/statistical' }">
      <div class="icon" i-carbon-chart-histogram />
      <div>统计</div>
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
  .add-btn, .left-btn,.right-btn{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transform: translateY(-1rem);
    box-shadow: 0 0 10px @primary-0;
    border: 1px solid rgb(209, 209, 209);
  }
  .add-btn{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @primary-0;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    transform: translateY(-1rem);
    box-shadow: 0 0 10px @primary-0;
    border: 1px solid rgb(209, 209, 209);
    .icon{
      color:#fff;
      transition: .2s;
    }
    .rote-icon{
      transform: rotate(135deg);
    }
    .popup-btn{
      font-size: small;
      position: absolute;
    }
    .left-btn{
      top: -50%;
      left: -80%;
      animation: show-popup-left .2s linear;
    }
    .right-btn{
      top: -50%;
      right: -80%;
      animation: show-popup-right .2s linear;
    }
    @keyframes show-popup-left {
      0%{
        opacity: 0;
        top: 0;
        left: 0;
      }
      100%{
        top: -50%;
        left: -80%;
      }
    }
    @keyframes show-popup-right {
      0%{
        opacity: 0;
        top: 0;
        right: 0;
      }
      100%{
        top: -50%;
        right: -80%;
      }
    }
  }
}
</style>
