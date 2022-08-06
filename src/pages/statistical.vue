<script lang="ts" setup>
import * as echarts from 'echarts'
const main = ref()
onMounted(
  () => {
    init()
  },
)
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(main.value)
  // 指定图表的配置项和数据
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    xAxis: {
      data: ['1月', '2月', '4月', '5月', '6月'],
      // show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
      boundaryGap: false, // 不留白，从原点开始
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        data: [100, 200, 160, 80, 300],
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(128, 255, 165)',
            },
            {
              offset: 1,
              color: 'rgb(1, 191, 236)',
            },
          ]),
        },
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
</script>

<template>
  <div>
    <Topbar title="统计" />
    <div class="container">
      <div flex gap-2 items-end>
        <div text-xl color-green>
          支出
        </div>
        <div>收入</div>
        <div>对比</div>
      </div>
      <div class="date" flex justify->
        <div class="date-item">
          5月
        </div>
        <div class="date-item">
          6月
        </div>
        <div class="date-item">
          7月
        </div>
        <div class="date-item">
          8月
        </div>
        <div class="date-item">
          9月
        </div>
        <button class="month-select">
          月
        </button>
      </div>
      <div ref="main" class="echarts" />
      <InfoCard />
      <div class="expenditure-top">
        <div class="title">
          支出排行
        </div>
        <div class="item-container">
          <div v-for="i in 4" :key="i" class="item">
            <div i-carbon-airline-digital-gate text-xl class="icon" />
            <div class="item-right">
              <div class="title">
                购物&nbsp;&nbsp;{{ i * 10 }}%
              </div>
              <div class="process-bar">
                <div class="bar" :style="{ width: `${i * 10}%` }">
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container{
  padding: 1rem;
  .date{
    margin: 1rem 0;
    display: flex;
    font-size: small;
    justify-content: space-evenly;
    .date-item{
      color: @gray-2;
      padding: .3rem .8rem;
      border-radius: .6rem;
      background-color: rgb(237,250,248);
    }
    .month-select{
      color: @primary-0;
    }
  }
  .echarts{
    width: 100%;
    height: 200px;
  }
  .item-container{
    background-color: #fff;
    border-radius: .2rem;
    padding: 1em;
    .item{
      display: flex;
      align-items: center;
      padding-bottom: .4rem;
      gap: .5rem;
      .icon{
        font-size: 1.5rem;
        color: @primary-1;
      }
      .item-right{
        flex: 1;
      }
      .process-bar{
        position: relative;
        width: 100%;
        height: 10px;
        background-color: @primary-3;
        border-radius: 5px;
        .bar{
          height: 100%;
          div{
            width: 100%;
            height: 100%;
            border-radius: 5px;
            background-color: @primary-1;
            animation: load-bar .5s ease-out;
          }
        }

        @keyframes load-bar {
          0%{
            width: 0;
          }
          100%{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
