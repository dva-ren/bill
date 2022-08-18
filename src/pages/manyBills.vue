<script setup lang="ts">
import { useMainStore } from '~/store'

const selected = ref('all')
const box = ref<HTMLElement>()
useTitle('多人账单')
const mainStore = useMainStore()
const changeSelect = (s: 'all' | 'time') => {
  if (s === selected.value)
    return
  selected.value = s
  switch (s) {
    case 'all':{
      box.value?.scrollTo(0, 0)
      break
    }
    case 'time':{
      box.value?.scrollTo(500, 0)
      break
    }
  }
}
const addEvent = () => {
  let startX = 0
  let startY = 0
  // let Point = 0
  box.value?.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].screenX
    startY = e.changedTouches[0].screenY
  })
  box.value?.addEventListener('touchend', (e) => {
    const offestX = startX - e.changedTouches[0].screenX
    const offestY = startY - e.changedTouches[0].screenY
    // console.log(offest)
    if (Math.abs(offestX) > 60 && Math.abs(offestY) < 10) {
      if (offestX > 0) {
        selected.value = 'time'
        box.value?.scrollTo(500, 0)
      }
      else {
        selected.value = 'all'
        box.value?.scrollTo(0, 0)
      }
    }
  })
}
onMounted(() => {
  addEvent()
  // box.value?.addEventListener('scroll', () => {
  //   if (box.value?.scrollLeft > 80 || box.value?.scrollLeft < 120)
  //     box.value?.scrollTo(500, 0)
  //   else if (box.value?.scrollLeft < 120 || box.value?.scrollLeft > 80)
  //     box.value?.scrollTo(0, 0)
  // })
})
</script>

<template>
  <div>
    <Topbar title="记账" />
    <Navbar />
    <div class="bill">
      <div class="count">
        <div class="count-card">
          <div>xxx</div>
          <div class="base-amount money amount">
            <span>6666</span>
            <span>.26</span>
          </div>
        </div>
        <div class="count-card">
          <div>xxx</div>
          <div class="base-amount money amount">
            <span>6666</span>
            <span>.26</span>
          </div>
        </div>
        <div class="count-card">
          <div>xxx</div>
          <div class="base-amount money amount">
            <span>6666</span>
            <span>.26</span>
          </div>
        </div>
      </div>
      <div class="bill-container">
        <div class="select">
          <button :class="{ active: selected === 'all' }" @click="changeSelect('all')">
            全部
          </button>
          <button :class="{ active: selected === 'time' }" @click="changeSelect('time')">
            按时间
          </button>
        </div>
        <div ref="box" class="container">
          <div class="bill-list">
            <BillItem v-for="i in mainStore.recordList.multiUser" :key="i" />
            <div v-if="mainStore.recordList.multiUser.length === 0" class="empty">
              列表为空
            </div>
          </div>
          <div class="bill-list">
            <div class="info-bar">
              <div style="font-size: 1rem; color:#000;">
                今天
              </div>
              <div style="flex:1">
                8月3日 星期三
              </div>
              <div class="info">
                <span>收</span>
                <span class="amount">250.00</span>
                <span>支</span>
                <span class="amount">200.00</span>
              </div>
            </div>
            <div>
              <BillItem v-for="i in mainStore.recordList.multiUser" :key="i" />
              <div v-if="mainStore.recordList.multiUser.length === 0" class="empty">
                列表为空
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bill {
  padding: 1rem;
  .count {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    .count-card {
      flex: 1;
      padding: 1rem;
      border-radius: .2rem;
      font-size: small;
      color: rgba(255, 255, 255, .7);
      background: linear-gradient(@primary-0, @primary-1);
      .amount {
        color: #fff;
      }
    }
  }
  .bill-container{
    margin-top: 2rem;
    .select{
      color: gray-1;
      font-size: small;
      margin: .6rem 0;
      button{
        width: 3rem;
      }
      .active{
        font-weight: 600;
        font-size: larger;
        color: @gray-10;
      }
    }

    .info-bar{
      display: flex;
      gap: .5rem;
      align-items: flex-end;
      font-size: small;
      color: @gray-0;
      .amount{
        color:@gray-1;
        margin: 0 .5rem 0 .2rem;
      }
    }
    .container{
      position: relative;
      // display: flex;
      overflow: auto;
      white-space: nowrap;
      scroll-behavior: smooth;
      .bill-list{
        // height: 100%;
        padding: 1rem;
        background-color: #fff;
        display: inline-block;
        width: 100%;
        vertical-align: top;
        .empty{
          margin: 1rem 0;
          text-align: center;
          font-size: small;
          color: @gray-1;
        }
      }
    }

  }
}
</style>
