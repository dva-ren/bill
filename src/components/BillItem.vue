<script lang="ts" setup>
import type { Record } from '~/types'
import { categoryes } from '~/types'
import { amountToArray } from '~/composables/amountFormat'
const props = defineProps<{
  data: Record
}>()

const amount = computed(() => amountToArray(props.data.amount))
</script>

<template>
  <div class="bill-item">
    <div class="icon">
      <svg class="icon-font" aria-hidden="true">
        <use :xlink:href="`#icon-${categoryes[props.data.category].icon}`" />
      </svg>
    </div>
    <div class="info">
      <div class="name">
        {{ props.data.remark || categoryes[props.data.category].name }}
      </div>
      <div>{{ props.data.date }}</div>
    </div>
    <div class="amount" :style="{ color: props.data.type === 'expend' ? '' : '#ed5a65' }">
      <span>{{ props.data.type === 'expend' ? '-' : '+' }}</span>
      <span>{{ amount[0] }}</span>
      <span class="decimal">.{{ amount[1] || '00' }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.bill-item{
  display: flex;
  align-items: center;
  padding: .5rem;
  gap: .8rem;
  .icon{
    // margin: .5rem;
    // width: 2rem;
    // height: 2rem;
    border: .5rem;
    background-color: @primary-8;
    border-radius: .5rem;
    .iconfont{
      font-size: 2rem;
    }
  }
  .info{
    flex:1;
    color: @gray-1;
    font-size: @font-size-sm;
    .name{
      font-size: @font-size-base;
      color: @gray-10;
      font-weight: 600;
    }
  }
  .amount{
    font-size: @font-size-lg;
    color: @primary-0;
    .decimal{
      font-size: @font-size-sm;
    }
  }
}
</style>
