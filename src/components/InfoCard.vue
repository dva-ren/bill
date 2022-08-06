<script lang="ts" setup>
// const props = defineProps<{

// }>()
const num = ref(10)
const line = 2 * Math.PI * 26

const dashArrayWidth = computed(() => ({
  // stork-dasharray有两个参数，第一个代表虚线的宽度，第二个代表虚线两两的间隔
  start: `0,${line}`, // 开始状态
  end: `${line * (num.value / 100)},${line * ((100 - num.value) / 100)}`, // 结束状态
}))
</script>

<template>
  <div class="info-card">
    <div class="info-container">
      <div class="base-title">
        本月支出
      </div>
      <div class="info">
        <div class="info-item">
          <div>共计支出</div>
          <div class="base-amount">
            <span>526</span>
            <span>.00</span>
          </div>
        </div>
        <div class="info-item">
          <div>记账笔数</div>
          <div class="base-amount">
            12
          </div>
        </div>
        <div class="info-item">
          <div>日均支出</div>
          <div class="base-amount">
            <span>142</span>
            <span>.00</span>
          </div>
        </div>
      </div>
    </div>
    <div class="proportion">
      <div class="percentage">
        5%
      </div>
      <svg width="100px" height="100px" class="svg">
        <!-- 外圈圆 -->
        <circle cx="50" cy="50" r="30" stroke="#daf4ee" stroke-width="12" fill="none" />
        <!-- 内圈圆，虚线用于展示进度 -->
        <circle cx="50" cy="50" r="26" stroke="#3BCEB1" stroke-width="12" fill="none" :stroke-dasharray="dashArrayWidth.end" stroke-linecap="round">
          <!-- svg动画 -->
          <animate attributeName="stroke-dasharray" :from="dashArrayWidth.start" :to="dashArrayWidth.end" dur=".5s" />
          <!-- <animate attributeName="stroke" from="#3BCEB1" to="#53d74c" dur="1s" /> -->
        </circle>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.info-card {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: .2rem;
  padding: 1rem;
  .info-container {
    flex: 1;

    .info {
      display: flex;
      justify-content: space-between;
      .info-item {
        font-size: .8rem;
        color: @gray-1;
        text-align: center;
      }
    }

  }

  .proportion {
    width: 6rem;
    height: 100%;
    position: relative;
    svg,.percentage{
      position: absolute;
      left: 50%;
      top: 50%;
    }
    .percentage{
      width: auto;
      height: auto;
      color: @primary-0;
      font-weight: bold;
      transform: translate(-50%,-50%);
    }
  }

  svg {
    transform: translate(-50%,-50%) rotate(-90deg);
  }
  .progress {
    animation: rotate 1.2s linear both;
  }
  @keyframes rotate {
    from {
      stroke-dashoffset: 600px;
    }
    to {
      stroke-dashoffset: 300px;
    }
  }
}
</style>
