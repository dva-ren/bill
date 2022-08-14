<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },

})
const emits = defineEmits(['update:modelValue'])
const closed = ref(false)

const onPopupClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget)
    closed.value = true
}
const onAnimationend = (e) => {
  if (!closed.value)
    return
  emits('update:modelValue', false)
  closed.value = false
}
</script>

<template>
  <Teleport to="body">
    <div v-show="props.modelValue" class="popup" @click="onPopupClick">
      <div class="content-container" :class="{ animate__fadeOut: closed }" @animationend="onAnimationend">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="less">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.content-container {
  bottom: 0;
  left: 0;
  width: 100%;
  position: absolute;
  height: 40%;
  background-color: #fff;
  border-radius: .2rem;
  overflow: auto;
  box-shadow: 0 0 .2rem rgba(0, 0, 0, .1);
  // transform: translateY(100%);
  transition: .2s;
  animation: fadeIn .2s ease-in-out;
}
.animate__fadeIn {
  --animate-duration: .2s;
}
.animate__fadeOut {
  animation: fadeOut .2s ease-in-out;
}

@keyframes fadeIn{
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes fadeOut{
    0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
