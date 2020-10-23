<template>
  <div class="Echarts">
        <h3 style=" text-align: center;"> 当月城市情况总览</h3>
   <div id="tu5" style="width: 500px;height:290px;">

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
      var myChart = this.$echarts.init(document.getElementById("tu5"));

      var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            series: [
                {
                    name:'温湿指数',
                    type:'pie',
                    selectedMode: 'single',
                    radius: ['75%', '96%'],

                    label: {
                        normal: {
                            position: 'inside',
                            fontSize: 15,
                            color:'',
                            fontFamily:'Microsoft Yahei'
                        }
                    },
                    data:[
                        {value:4, name:'极冷，极不舒适'},
                        {value:3, name:'寒冷，不舒适'},
                        {value:3, name:'寒冷，不舒适'},
                        {value:2, name:'清，舒适'},
                        {value:2, name:'凉，非常舒适'},
                        {value:2, name:'暖，舒适'},
                        {value:2, name:'偏热，较舒适'},
                        {value:1, name:'偏热，较舒适'},
                        {value:1, name:'极闷热，极不舒适'},
            
                    ]
                },
                {
                    name:'风效指数',
                    type:'pie',
                    radius: ['30%', '70%'],
                    label: {
                        normal: {
                            position:'inside',
                            align:'right',
                            fontSize: 18,
                            fontFamily:'Microsoft YaHei',
                            color:"#FFEFE0"
                        }
                    },
                    data:[
                        {value:1, name:'酷冷'},
                        {value:1, name:'冷'},
                        {value:1, name:'冷凉'},
                        {value:1, name:'凉'},
                        {value:1, name:'舒适'},
                        {value:1, name:'暖'},
                        {value:1, name:'暖热'},
                        {value:1, name:'热'},
                        {value:1, name:'炎热'},
             
                    ]
                },
                {
                    name:'舒适度',
                    type:'pie',
                    radius: ['0%', '25%'],
                    label: {
                        normal: {
                            position: 'inside',
                            fontSize: 8,
                            fontFamily:'Microsoft YaHei',
                            color:'#80F0E3'
                        }
                    },
                    data:[
                        {value:2, name:'非常舒适'},
                        {value:2, name:'舒适'},
                        {value:2, name:'较舒适'},
                        {value:2, name:'较不舒适'},
                        {value:2, name:'不舒适'},
                        {value:2, name:'极不舒适'},
                    ]
                }
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
