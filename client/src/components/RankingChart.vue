<template>
  <div class="basic">
    <div id="title" style="font-size:25px">50城市指数排名情况</div>
   <div id="tu1">

       <!-- wuxi -->
   </div>
  </div>
</template>

<script>
import echarts from "echarts";
import pubsub from "pubsub-js";

//每日新增图
const props ={
    data: {},
};
export default {
    name: "RankingChart",
    props,
    data(){
        return {
            data_0:[],//城市
            data_1:[],//风效指数
            data_2:[],//温湿指数
            data_3:[],//舒适度
            myChart:null,
        };
    },
    watch:{
        data:{
            handler(){
                // console.log(this.data)
                this.data_0 =[];
                this.data_1 =[];
                this.data_2 =[];
                this.data_3 =[]; 
                for(var i=0;i<this.data.length;i++){
                    this.data_0[i]=this.data[i].city
                    this.data_1[i]=this.data[i].windeff;
                    this.data_2[i]=this.data[i].greenhouse;
                    this.data_3[i]=this.data[i].comfort;
                }
                this.ChartInit();
            }  
        }
    },
    methods: {
        ChartInit() {
            var myChart = echarts.init(document.getElementById("tu1"));
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
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: this.data_0
                    }
                ],
                series: [
                    {
                        name: '风效指数',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        color: '#3fb1e3',
                        data: this.data_1
                    },
                    {
                        name: '温湿指数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true
                        },
                        color:'#22c3aa',
                        data: this.data_2
                    },
                    {
                        name: '舒适度',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: false,
                            position: 'left'
                        },
                        color:'#c4ebad',
                        data: this.data_3
                    }
                ]
            };

                myChart.setOption(option);

            },
            
        },
        mounted() {
            pubsub.subscribe("getTimeData",(msg,data)=>{
                //console.log(data);
                this.$root.$emit("updataRankingChart",data);
            })
            this.ChartInit()
        },
};
</script>
<style>
#title{
    position: absolute;
    height: 5%;
    width: 100%;
    left: 1%;
}
#tu1{
    position: absolute;
    height: 95%;
    width: 100%;
    top: 5%;
}
</style>
