<script setup lang="ts">
import dayjs from 'dayjs'
import { useAmountCount } from '~/composables'
import type { Record } from '~/types'

const { data = [] } = defineProps({
  data: Array<Record>,
})
const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
const today = computed(() => dayjs().format(`M月D日 ${week[dayjs().day()]}`))
const amountCount = computed(() => useAmountCount(data))
</script>

<template>
  <div class="bill-list">
    <div class="info-bar">
      <div style="font-size: 1rem; color:#000;">
        今天
      </div>
      <div style="flex:1">
        {{ today }}
      </div>
      <div class="info">
        <span>收</span>
        <span class="amount">{{ amountCount.income }}</span>
        <span>支</span>
        <span class="amount">{{ amountCount.expend }}</span>
      </div>
    </div>
    <div>
      <BillItem v-for="i in data" :key="i.id" :data="i" />
    </div>
  </div>
</template>

<style scoped lang="less">
.bill-list{
  color: gray;
  padding: 1rem;
  background-color: #fff;

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
}
</style>
