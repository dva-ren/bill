<script lang="ts" setup>
import { useMainStore } from '~/store'
import { categoryes } from '~/types'
useTitle('添加记录')
const form = reactive({
  category: '',
  type: 'expend' as 'expend' | 'income',
  amount: 0,
  date: new Date().toLocaleDateString(),
  remark: '',
})
const categoryValue = ref('')

const mainStore = useMainStore()
const router = useRouter()
const handleBack = () => {
  router.go(-1)
}

const options = computed(() => {
  const res: any[] = []
  for (const k of Object.keys(categoryes))
    res.push({ name: categoryes[k].name, value: k })
  return res
})
const add = () => {
  if (form.amount === 0 || !form.category.length || !form.date)
    return
  mainStore.addRecord('usually', {
    id: new Date().getTime(),
    category: categoryValue.value,
    amount: form.amount,
    date: form.date,
    type: form.type,
    remark: form.remark,
  })
  router.go(-1)
}
const onOptionClick = (o) => {
  categoryValue.value = o.value
}
</script>

<template>
  <div>
    <Topbar title="添加记录" :back="true" :finish="true" @on-back="handleBack" @on-finish="add" />
    <div class="type">
      <div @click="form.type = 'expend'">
        支出
      </div>
      <div @click="form.type = 'income'">
        收入
      </div>
      <div class="active" :style="{ transform: form.type === 'expend' ? 'translateX(0)' : 'translateX(100%)' }" />
    </div>
    <div class="form">
      <div class="form-item">
        <m-input v-model="form.category" label="分类" placeholder="输入或选择分类" type="checkBox" :options="options" @onOptionClick="onOptionClick" />
      </div>
      <div class="form-item">
        <m-input v-model="form.amount" label="金额" allow-clear placeholder="0.00" type="number">
          <template #prefix>
            <div class="symbol">
              ¥
            </div>
          </template>
        </m-input>
      </div>
      <div class="form-item">
        <m-input v-model="form.date" label="时间" placeholder="选择时间" type="date" />
      </div>
      <div class="form-item">
        <m-input v-model="form.remark" label="备注" placeholder="备注（可选）" type="text" />
      </div>
      <div class="form-item">
        <button class="add-person">
          添加人员 +
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.type{
  position: relative;
  display: flex;
  border: 1px solid #2333;
  div{
    z-index: 2;
    background-color: transparent;
    flex: 1;
    text-align: center;
    padding: .6rem;
  }
  .active{
    height: 100%;
    width: 50%;
    z-index: 1;
    position: absolute;
    background-color: #2333;
    border-radius: .4rem;
    transition: .1s;
    box-shadow: 0 0 6px rgb(160, 160, 160);
  }
}
.form{
  .form-item{
    margin: .8rem;
  }
  .add-person{
    border: 1px dashed @primary-4;
    border-radius: .6rem;
    padding: .2rem .6rem;
  }
}
.symbol{

}
</style>
