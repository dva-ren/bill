<script setup lang="ts">
import { amountToArray, useAmountCount } from '~/composables/amountFormat'
import { useMainStore } from '~/store'
useTitle('账单')
const mainStore = useMainStore()
const sortord = ref<'day' | 'month'>('day')

const amountCount = computed(() => useAmountCount(mainStore.recordList.usually))
const monthRecord = computed(() => {
  const res = {}
  mainStore.recordList.usually.forEach((i) => {
    const m = new Date(i.date).getMonth() + 1
    if (!res[m])
      res[m] = []
    res[m].push(i)
  })
  return res
})

const isEmpty = computed(() => mainStore.recordList.usually.length === 0)
</script>

<template>
  <div class="box">
    <Topbar title="账单" style="color: white;" />
    <Navbar />
    <div class="bill">
      <div style="font-size: small;margin-bottom: .5rem;">
        下午好,
      </div>
      <div style="font-weight: bold;">
        现在的魏无羡，离开了蓝忘机就不行。 --魔道祖师
      </div>
      <div class="count-card">
        <div>余额</div>
        <div class="base-amount money" style="color: #fff;">
          <span>5000</span>
          <span>.00</span>
        </div>
        <div class="item-container">
          <div class="item">
            <div>总收入</div>
            <div class="money amount">
              <span>{{ amountToArray(amountCount.income)[0] }}</span>
              <span>.{{ amountToArray(amountCount.income)[1] }}</span>
            </div>
          </div>
          <div class="item">
            <div>总支出</div>
            <div class="money amount">
              <span>{{ amountToArray(amountCount.expend)[0] }}</span>
              <span>.{{ amountToArray(amountCount.expend)[1] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bill-container">
        <div class="select">
          <button :class="{ active: sortord === 'day' }" @click="sortord = 'day'">
            最新
          </button>
          <button :class="{ active: sortord === 'month' }" @click="sortord = 'month'">
            按月份
          </button>
        </div>
        <template v-if="!isEmpty">
          <BillContainer v-if="sortord === 'day'" :data="mainStore.recordList.usually" />
          <BillContainer v-for="m, idx of monthRecord" v-else :key="m" my-2 :data="monthRecord[idx]" :month="idx" />
        </template>
        <Empty v-if="isEmpty" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box{
  background: linear-gradient(#429691,#2A7C76);
  background-size: 100% 15rem;
  background-repeat: no-repeat;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
.bill {
  padding: 1rem;
  color:#fff;

  .count-card{
    background-color: #429691;
    padding: 1rem;
    margin-top: 2rem;
    border-radius: .4rem;
    font-size: @font-size-sm;
    box-shadow: 0 2px 10px #429691;
    border: 1px solid rgb(107, 151, 134);
    .item-container{
      display: flex;
      justify-content: space-between;
      color: @gray-0;
      padding: 1rem;
      padding-bottom: 0;
      .item{
        .amount{
          color: #fff;
          font-size: @font-size-lg;
          span:nth-child(2){
            font-size: @font-size-sm;
          }
        }
      }
    }
  }
  .bill-container{
    margin-top: 2rem;
    .select{
      color: gray-1;
      font-size: @font-size-sm;
      margin: .6rem 0;
      color: gray;
      button{
        width: 3rem;
      }
      .active{
        font-weight: 600;
        font-size: @font-size-base;
        color: @gray-10;
      }
    }
  }
}
</style>
