<script lang="ts" setup>
const { defaultValue } = defineProps<{ defaultValue: Date }>()

const emit = defineEmits(['change'])
const date = ref([defaultValue.getMonth() + 1, defaultValue.getMonth() + 1, defaultValue.getHours(), defaultValue.getMinutes(), 0])

const handleScroll = useDebounceFn((idx, e) => {
  const scroll = e.target.parentNode.scrollTop
  const h = 40
  const n = Math.floor(scroll / h)
  if (scroll < n * h + 20) {
    e.target.parentNode.scrollTo({
      top: n * h,
      behavior: 'smooth',
    })
    date.value[idx] = n + 1
  }
  else {
    e.target.parentNode.scrollTo({
      top: (n + 1) * h,
      behavior: 'smooth',
    })
    date.value[idx] = n + 2
  }
  emit('change', `${date.value[0]}-${date.value[1] < 10 ? `0${date.value[1]}` : date.value[2]} ${date.value[2] < 10 ? `0${date.value[2]}` : date.value[2]}:${date.value[3]}`)
}, 200)
</script>

<template>
  <div class="date">
    <div class="number-container" @touchend="handleScroll(0, $event)">
      <div v-for="i in 12" :key="i" class="number">
        {{ i }}月
      </div>
    </div>
    <div class="number-container" @touchend="handleScroll(1, $event)">
      <div v-for="i in 31" :key="i" class="number">
        {{ i }}日
      </div>
    </div>
    <div class="number-container" @touchend="handleScroll(2, $event)">
      <div v-for="i in 23" :key="i" class="number">
        {{ i }}时
      </div>
    </div>
    <div class="number-container" @touchend="handleScroll(3, $event)">
      <div v-for="i in 59" :key="i" class="number">
        {{ i }}分
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.date{
  position: relative;
  width: 100%;
  height: 8.6rem;
  padding: .5rem 0;
  display: flex;
  .number-container{
    padding: 2.4rem 0;
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
    flex: 1;
    // justify-content: space-evenly;
    text-align: center;
    .number{
      line-height: 2.4rem;
      border:1px solid #f1f1f1;
      margin: 0 .5rem;
    }
  }
  &::before{
    content: '';
    position: absolute;
    top: 50%;
    height: 2.8rem;
    width: 100%;
    transform: translateY(-50%);
    border: 1px solid #f2f2f2;
    background-color: rgba(200, 200, 200, 0.4);
    pointer-events: none;
  }
}
</style>
