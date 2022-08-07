<script lang="ts" setup>
import { useMainStore } from '~/store/index.js'
useTitle('添加记录')
const form = reactive({
  category: '',
})

const mainStore = useMainStore()
const router = useRouter()
const handleBack = () => {
  router.go(-1)
}
</script>

<template>
  <div>
    <Topbar title="添加记录" :back="true" :finish="true" @on-back="handleBack" />
    <div class="form">
      <div class="form-item">
        <div>分类</div>
        <div class="content">
          <m-input v-model="form.category" allow-clear placeholder="0.00" type="number">
            <template #prefix>
              ¥
            </template>
          </m-input>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
