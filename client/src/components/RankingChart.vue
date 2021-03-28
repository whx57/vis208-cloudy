<template>
  <div class="basic">
    <div id="title" style="font-size:25px">
        {{month}}月全国城市舒适度星级排名
    </div>
   <div id="tu1"></div>
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
            month: 1,
            data_0:[],//城市
            data_1:[],//舒适度
            myChart:null,
        };
    },
    watch:{
        data:{
            handler(){
                // console.log(this.data)
                this.data_0 =[];
                this.data_1 =[]; 
                for(var i=0;i<this.data.length;i++){
                    this.data_0[i]=this.data[i].city;
                    this.data_1[i]=this.data[i].comfort;
                }
                this.ChartInit();
            }  
        }
    },
    methods: {
        ChartInit() {
            var myChart = echarts.init(document.getElementById("tu1"));
            var spirit = 'path://M949.12 386.592c-4.864-15.008-17.856-25.952-33.44-28.192l-256.992-37.344-114.944-232.896c-6.976-14.144-21.376-23.104-37.152-23.104-15.776 0-30.176 8.96-37.152 23.104l-114.944 232.896L97.472 358.4c-15.616 2.272-28.576 13.184-33.44 28.192s-0.8 31.456 10.496 42.464l185.984 181.28-43.904 255.968c-2.656 15.552 3.712 31.264 16.48 40.544 12.768 9.28 29.664 10.496 43.648 3.136l229.888-120.864 229.856 120.864c6.048 3.168 12.672 4.768 19.264 4.768 8.576 0 17.152-2.656 24.352-7.904 12.768-9.28 19.136-24.992 16.48-40.544l-43.904-255.968 185.984-181.28C949.92 418.048 953.984 401.6 949.12 386.592z';
            var maxData = this.data_1[0];
            var option = {
                tooltip: {
                },
                xAxis: {
                    max: maxData,
                    splitLine: {show: false},
                    offset: 10,
                    show: false,
                },
                yAxis: {
                    data: this.data_0,
                    inverse: true,
                    axisTick: {show: false},
                    axisLine: {show: false},
                    axisLabel: {
                        margin: 10,
                        color: '#999',
                        fontSize: 18
                    }
                },
                grid: {
                    top: 'center',
                    height: 350,
                    left: 60,
                },
                series: [{
                    // current data
                    type: 'pictorialBar',
                    symbol: spirit,
                    symbolRepeat: 'fixed',
                    symbolMargin: '10%',
                    symbolClip: true,
                    symbolSize: 40,
                    color:["#EEEE00"],
                    symbolBoundingData: maxData,
                    data: this.data_1,
                    z: 10
                }, {
                    // full data
                    type: 'pictorialBar',
                    itemStyle: {
                        normal: {
                            opacity: 0.2
                        }
                    },
                    animationDuration: 0,
                    symbolRepeat: 'fixed',
                    symbolMargin: '10%',
                    symbol: spirit,
                    symbolSize: 40,
                    symbolBoundingData: maxData,
                    data: this.data_1,
                    z: 5
                }]
            };
            myChart.setOption(option);
        },
    },
    mounted() {
        pubsub.subscribe("getTimeData",(msg,data)=>{
            //console.log(data);
            this.month = data;
            this.$root.$emit("updataRankingChart",data);
        })
        this.ChartInit()
    },
};
</script>
<style>
#title{
    position: absolute;
    height: 2%;
    width: 100%;
    left: 1%;
}
#tu1{
    top:5%;
    left:5%;
    position: absolute;
    height: 95%;
    width: 95%;
}
</style>
