<script lang="ts" setup>
const emits = defineEmits(['input'])
const numberArr = ref<Array<number | '.'>>([])

const onNumberClick = (n: number) => {
  const index = numberArr.value.indexOf('.')
  if (index === -1 || numberArr.value.length - index <= 2)
    numberArr.value.push(n)
}
const deleteNumber = () => {
  if (numberArr.value.length > 0)
    numberArr.value.pop()
}
const inputPoint = () => {
  if (numberArr.value.includes('.'))
    return
  numberArr.value.push('.')
}
watch(numberArr.value, () => {
  const value = numberArr.value.join('')
  emits('input', value)
})
</script>

<template>
  <div class="keyboard">
    {{ numberArr }}
    <div class="number-container">
      <div v-for="i in 9" :key="i" class="number-item" @click="onNumberClick(i)">
        {{ i }}
      </div>
    </div>
    <div class="other-button">
      <div class="number-item point" @click="inputPoint">
        .
      </div>
      <div class="number-item" @click="onNumberClick(0)">
        0
      </div>
      <div class="number-item delete-button" @click="deleteNumber">
        <div i-carbon-close-outline class="icon" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.keyboard{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #CED2D9;
  padding: .6rem 1.5rem 4rem 1.5rem;
  .number-item{
    text-align: center;
    line-height: 2.3rem;
    height: 2.6rem;
    border: 1px solid @gray-1;
    background-color: #fff;
    border-radius: .3rem;
    // -webkit-tap-highlight-color:rgba(255,255,255,0);
    -webkit-tap-highlight-color: rgba(200, 200, 200, .4);
    cursor: pointer;
    // &:hover{
    //   box-shadow: inset 0 0 4px gray ;
    // }
  }
  .number-container{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    // grid-template-rows: 100px 100px 100px;
    grid-gap: .6rem;
  }
  .other-button{
    display: flex;
    gap: .6rem;
    padding-top: .6rem;
    .number-item{
      position: relative;
      flex:1;
    }
    .point{
      font-size: 1.3rem;
      font-weight: bold;
      background-color: transparent;
      line-height: 1.5rem;
    }
    .delete-button{
      border: 1px solid @gray-1;
      background-color: transparent;
      box-sizing: border-box;
      flex: 1;
      position: relative;
    }
    .icon{
      position: absolute;
      font-size: 1.4rem;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}
</style>
