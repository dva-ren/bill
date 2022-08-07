<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String as PropType<'text' | 'number'>,
    default: 'text',
  },
  allowClear: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const inputFocus = ref(false)
const showKeyBoard = ref(false)
const inputValue = ref(props.modelValue || '')

const showClear = computed(() => inputValue.value.length > 0 && props.allowClear)

const onInput = (e) => {
  const v = e.target.value as string
  inputValue.value = v
}

const clear = (e) => {
  inputValue.value = ''
}

const handleChange = (s: string) => {
  inputValue.value = s
}

const onFocus = () => {
  inputFocus.value = true
  if (props.type === 'number')
    showKeyBoard.value = true
}
watch(inputValue, () => {
  emits('update:modelValue', inputValue.value)
})
</script>

<template>
  <div class="input-container" :class="{ focus: inputFocus }">
    <div class="prefix">
      <slot name="prefix" />
    </div>
    <input class="input" :placeholder="props.placeholder" :value="inputValue" :type="props.type" @input="onInput" @focus="onFocus" @blur="inputFocus = false">
    <div class="suffix">
      <slot name="suffix">
        <button v-show="showClear" class="clear animate__animated animate__fadeIn" i-carbon-close-outline @click="clear" />
      </slot>
    </div>
    <NumberKeyboard v-show="showKeyBoard" @input="handleChange" />
  </div>
</template>

<style scoped lang="less">
.input-container{
  display: flex;
  align-items: center;
  gap:.2rem;
  border: 2px solid @gray-3;
  padding: .6rem;
  border-radius: .2rem;
  margin: .6rem;
  box-sizing: border-box;
  transition: all .1s ease-in-out;
  height: 3rem;

  .input{
    flex:1;
    outline: none;
    color: @primary-4;
    border-radius: .2rem;
    height: 100%;
    &:focus{
      outline: none;
    }
    background: transparent;
  }
  .clear{
    color: @primary-1;
    font-size: 1.2rem;
    vertical-align: bottom;
  }
  .prefix,.suffix{
    min-width: 1rem;
  }
  /* This only changes this particular animation duration */
  .animate__fadeIn {
    --animate-duration: .3s;
  }
}
.focus{
  border: 2px solid @primary-4;
}
</style>
