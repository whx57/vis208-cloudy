<template>
  <div class="Echarts">
   <div id="tu1" style="width: 600px;height:300px;">

       <!-- wuxi -->
   </div>
  </div>
</template>

<script>
// import echarts from "echarts";
//每日新增图
export default {
  name: "Echarts",
  data() {
    return {
      dates: null,
      diagnosisData: null,
      heathData: null,
      deathData: null,
      myChart: null,
      option: null
    };
  },

  methods: {
    ChartInit() {
    //   let that = this;
      var myChart = this.$echarts.init(document.getElementById("tu1"));
      var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['风效指数', '温湿指数', '舒适度']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['石家庄', '西安', '上海', '中山', '北京', '成都', '绵阳','昆明','重庆','黄冈']
    },
    series: [
        {
            name: '风效指数',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [320, 302, 301, 334, 390, 330, 320,321,323,421]
        },
        {
            name: '温湿指数',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [120, 132, 101, 134, 90, 230, 210,211,241,243,250]
        },
        {
            name: '舒适度',
            type: 'bar',
            stack: '总量',
            label: {
                show: true,
                position: 'insideRight'
            },
            data: [220, 182, 191, 234, 290, 330, 310,321,312,231]
        },

    ]
};
      myChart.setOption(option);
    },
    
  },
   mounted() {this.ChartInit()},


};
</script>
<style>
</style>
