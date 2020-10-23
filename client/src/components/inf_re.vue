<template>
 <div class="Echarts">
     <h2  id="name">信息栏</h2>
     <div id="city"><span>城市</span> <span>绵阳</span></div>
     <div id="month"> <span>推荐月份</span> <span></span></div>

   <div id="inf" style="width: 380px;height:420px;">

       <!-- wuxi -->
   </div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
    return {

    };
  },

  methods: {
    ChartInit() {
    //   let that = this;
      var myChart = this.$echarts.init(document.getElementById("inf"));
      var
option = {
    title: {
        text: '城市月属性'
    },
    tooltip: {},
    legend: {
        data: ['平均', '最低','最高']
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [
            { name: '温湿指数', max: 300},
            { name: '风效指数', max: 300},
            { name: '舒适度', max: 300},
    
        ]
    },
    series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
            {
                value: [70, 100, 130],
                name: '平均'
            },
            {
                value: [50, 40, 80],
                name: '最低'
            },
                      {
                value: [230, 150, 230],
                name: '最高'
            }
        ]
    }]
};
      myChart.setOption(option);
    },
    
  },
   mounted() {this.ChartInit()},
}

</script>
<style>
#city{
/* float: left; */
font-size: 30px;
  border: 2px solid #00000002;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #00000020;
}
#month{
/* float: left; */
  border: 2px solid #00000002;
  border-radius: 8px;
  box-shadow: 2px 2px 2px #00000020;
}
#name{
    text-align: center;
}
</style>