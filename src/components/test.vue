<template>
  <div id="chart-container" style="width: 500px; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';


export default {
  name: 'PieChart',
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      const chartContainer = document.getElementById('chart-container')
      console.log(1)
      const chart = echarts.init(chartContainer)
      console.log(2)
      const options = {
        title: {
          text: '饼状图示例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['数据1', '数据2', '数据3', '数据4', '数据5']
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '数据1' },
              { value: 310, name: '数据2' },
              { value: 234, name: '数据3' },
              { value: 135, name: '数据4' },
              { value: 1548, name: '数据5' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      chart.setOption(options)
    }
  }
}
</script>

<style>
#chart-container {
  width: 500px;
  height: 400px;
}
</style>
