<script setup lang="ts">
import { useMainStore } from '~/store'
import { amountToArray } from '~/composables/amountFormat'
useTitle('账单')
const mainStore = useMainStore()

const amountCount = computed(() => {
  let expend = 0; let income = 0
  mainStore.recordList.usually.forEach((item) => {
    if (item.type === 'expend')
      expend += item.amount
    else
      income += item.amount
  })
  return { expend, income }
})
</script>

<template>
  <div class="box">
    <Topbar title="账单" />
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
          <button class="active">
            最新
          </button>
          <button>按月份</button>
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
              <span class="amount">{{ amountCount.income }}</span>
              <span>支</span>
              <span class="amount">{{ amountCount.expend }}</span>
            </div>
          </div>
          <div>
            <BillItem v-for="i in mainStore.recordList.usually" :key="i.id" :data="i" />
          </div>
        </div>
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
      button{
        width: 3rem;
      }
      .active{
        font-weight: 600;
        font-size: @font-size-base;
        color: @gray-10;
      }
    }
    .info-bar{
      display: flex;
      gap: .5rem;
      align-items: flex-end;
      font-size: @font-size-xs;
      color: @gray-0;
      .amount{
        color:@gray-1;
        margin: 0 .5rem 0 .2rem;
      }
    }
    .bill-list{
      padding: 1rem;
      background-color: #fff;
    }
  }
}
</style>
