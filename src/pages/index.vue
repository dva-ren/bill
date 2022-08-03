<script setup lang="ts">

</script>

<template>
  <div>
    <Topbar title="记账" />
    <div class="bill">
      <div class="count">
        <div class="count-card">
          <div>当月总支出(元)</div>
          <div class="amount" font-mono>
            <span>6666</span>
            <span style="font-size: small;">.26</span>
          </div>
          <div>当月总收入 ￥1520.00</div>
        </div>
        <div class="count-card">
          <div>当月预算(元)</div>
          <div class="amount">
            <span>6666</span>
            <span style="font-size: small;">.26</span>
          </div>
          <div>当月总收入 ￥1200.00</div>
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
              <span class="amount">250.00</span>
              <span>支</span>
              <span class="amount">200.00</span>
            </div>
          </div>
          <div>
            <BillItem v-for="i in 5" :key="i" />
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

    .count-card {
      flex: 1;
      padding: 1rem;
      border-radius: .2rem;
      font-size: small;
      color: rgba(255, 255, 255, .7);
      background: linear-gradient(@primary-0, @primary-1);

      .amount {
        padding-top: .5rem;
        font-size: 2rem;
        font-weight: 600;
        color: #fff;
        letter-spacing: 1px;
        &::before {
          content: '￥';
          font-size: 1rem;
          font-weight: 400;
        }
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
    .bill-list{
      padding: 1rem;
      background-color: #fff;
    }
  }
}
</style>
