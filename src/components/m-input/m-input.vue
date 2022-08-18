<script lang="ts" setup>
import type { PropType } from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  type: {
    type: String as PropType<'text' | 'number' | 'checkBox' | 'time' | 'date'>,
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
  numberKeyboard: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array<{ name: string; value: string }>,
    required: false,
  },
})

const emits = defineEmits(['update:modelValue', 'onOptionClick'])

const inputFocus = ref(false)
const showKeyBoard = ref(false)
const inputValue = ref(props.modelValue || '')
const showOptions = ref(false)
const showClear = computed(() => inputValue.value.length > 0 && props.allowClear)
const showPopup = ref(false)

const onInput = (e) => {
  let v = e.target.value
  if (props.type === 'number')
    v = Number(v)
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
  if (props.type === 'number' && props.numberKeyboard)
    showKeyBoard.value = true
  else if (props.type === 'checkBox')
    showOptions.value = true
  else if (props.type === 'date')
    showPopup.value = true
}
const onBlur = () => {
  inputFocus.value = false
  // 延迟关闭，防止点击选项时，关闭
  setTimeout(() => {
    showOptions.value = false
  }, 200)
}
const onOptionClick = (o) => {
  inputValue.value = o.name
  showOptions.value = false
  emits('onOptionClick', o)
}
watch(inputValue, () => {
  emits('update:modelValue', inputValue.value)
})
</script>

<template>
  <div class="input-component">
    <div class="label">
      {{ props.label }}
    </div>
    <div class="input-container" :class="{ focus: inputFocus }">
      <slot name="prefix" />
      <input class="input" :placeholder="props.placeholder" :value="inputValue" :type="props.type === 'number' ? 'number' : 'text'" @input="onInput" @focus="onFocus" @blur="onBlur">
      <slot name="suffix">
        <template v-if="props.type === 'text'">
          <button v-show="showClear" class="clear animate__animated animate__fadeIn" i-carbon-close-outline @click="clear" />
        </template>
        <template v-if="props.type === 'checkBox'">
          <button v-show="!showOptions" class="clear animate__animated animate__fadeIn" i-carbon-caret-down @click="showOptions = true" />
          <button v-show="showOptions" class="clear animate__animated animate__fadeIn" i-carbon-caret-up @click="showOptions = false" />
        </template>
      </slot>
      <div v-if="props.numberKeyboard">
        <NumberKeyboard v-show="showKeyBoard" @input="handleChange" />
      </div>
    </div>
    <div v-if="props.type === 'checkBox'" class="options">
      <div v-show="showOptions" class="options-container">
        <div v-for="o in props.options" :key="o.value" class="option-item" @click="onOptionClick(o)">
          {{ o.name }}
        </div>
      </div>
    </div>
    <Popup v-if="props.type === 'date'" v-model="showPopup">
      <DatePicker @change="handleChange" />
    </Popup>
  </div>
</template>

<style scoped lang="less">
.input-component{
  position: relative;
  .label{
    margin-bottom: .6rem;
  }
  .input-container{
    padding: .6rem;
    display: flex;
    align-items: center;
    gap:.2rem;
    border: 2px solid @gray-3;
    border-radius: .2rem;
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
    // .prefix,.suffix{
    //   min-width: 1rem;
    // }
    /* This only changes this particular animation duration */
    .animate__fadeIn {
      --animate-duration: .3s;
    }

  }
  .focus{
    border: 2px solid @primary-4;
  }
}
.options{
  box-sizing: border-box;
  position: fixed;
  right: 0;
  padding: 0 .9rem;
  width: 100%;
  z-index: 99;
  .options-container{
    border: 1px solid #0000001a;
    box-shadow: 0 4px 10px #0000001a;
    background-color: #fff;
    .option-item{
      padding: .5rem 1rem;
      &:hover{
        background-color: rgb(214, 214, 214);
      }
    }
  }
}
</style>
