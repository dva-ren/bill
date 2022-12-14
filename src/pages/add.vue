<script lang="ts" setup>
import dayjs from 'dayjs'
import { useMainStore } from '~/store'
import type { Person } from '~/types'
import { categoryes } from '~/types'
useTitle('添加记录-bill')
const form = reactive({
  category: '',
  type: 'expend' as 'expend' | 'income',
  amount: 0,
  date: dayjs().format('MM-DD hh:mm'),
  remark: '',
  personnel: [] as Person[],
})
const categoryValue = ref('')
const name = ref('')
const showInput = ref(false)

const mainStore = useMainStore()
const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
const selectVisible = ref(false)
const isShow = ref(false)
const nameInput = ref<HTMLElement>()

const options = computed(() => {
  const res: any[] = []
  for (const k of Object.keys(categoryes))
    res.push({ name: categoryes[k].name, value: k })
  return res
})

const add = () => {
  if (form.amount === 0 || !form.category.length || !form.date) {
    isShow.value = true
    setTimeout(() => {
      isShow.value = false
    }, 1500)
    return
  }
  if (form.personnel.length === 0) {
    mainStore.addRecord({
      id: new Date().getTime(),
      category: categoryValue.value,
      amount: form.amount,
      date: form.date,
      type: form.type,
      remark: form.remark,
    })
  }
  else {
    mainStore.addMultiUserRecord({
      id: new Date().getTime(),
      category: categoryValue.value,
      amount: form.amount,
      date: form.date,
      type: form.type,
      remark: form.remark,
      personnel: form.personnel,
    })
  }
  router.go(-1)
}
const onOptionClick = (o) => {
  categoryValue.value = o.value
}
const handleSelect = (p: Person) => {
  const index = form.personnel.indexOf(p)
  if (index === -1)
    form.personnel.push(p)
  else
    form.personnel.splice(index, 1)
}
const onAddNameClick = () => {
  showInput.value = true
  nextTick(() => {
    nameInput.value?.focus()
  })
}
const handleInputBlur = () => {
  if ((name.value.trim() ?? '') === '')
    return
  mainStore.addNewPerson(name.value)
  name.value = ''
  showInput.value = false
}
</script>

<template>
  <div>
    <Toast content="参数不正确" :show="isShow" />
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
        <div class="person">
          <div v-for="p in form.personnel" :key="p.id" class="item">
            {{ p.name }}
          </div>
          <button class="item add-btn" @click="selectVisible = true">
            人员选择
          </button>
        </div>
      </div>
      <Popup v-model="selectVisible">
        <div class="select-person">
          <div v-for="p in mainStore.person" :key="p.id" class="person-item" :class="{ selected: form.personnel.includes(p) }" @click="handleSelect(p)">
            {{ p.name }}
          </div>
          <input v-if="showInput" ref="nameInput" v-model="name" type="text" class="person-item" @blur="handleInputBlur">
          <button v-if="!showInput" btn @click="onAddNameClick">
            添加人员 +
          </button>
        </div>
      </Popup>
    </div>
  </div>
</template>

<style scoped lang="less">
.type{
  position: relative;
  display: flex;
  border: 1px solid #2333;
  user-select: none;
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
    background-color: @primary-3;
    border-radius: .4rem;
    transition: .1s;
    box-shadow: inset 0 0 6px @primary-1;
  }
}
.form{
  .form-item{
    margin: .8rem;
  }

}
.person{
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  .item{
    border-radius: .6rem;
    border: 1px solid @primary-4;
    padding: .2rem .6rem;
  }
  .add-btn{
    border: 1px dashed @primary-4;
  }
}
.select-person{
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  .person-item{
    width: 4rem;
    line-height: 2rem;
    text-align: center;
    border: #2333 1px solid;
  }
  .selected{
    background-color: @primary-4;
  }
}
</style>
