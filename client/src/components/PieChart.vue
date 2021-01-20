<template>
  <div class="Echarts">
    <div id="title" style="font-size:23px">{{month}}月城市情况总览</div>
    <div id="tu5"></div>
  </div>
</template>
<script>
// import echarts from "echarts";
import pubsub from "pubsub-js"
//每日新增图
const props={
    data:{},
}
export default {
    name:"PieChart",
    props,
    data() {
        return{
            month:1,
        };
    },
    watch:{
        data:{
            handler(){
                this.ChartInit();
            } ,
             deep:true
        }
    },
    methods:{
        ChartInit(){
             var myChart = this.$echarts.init(document.getElementById("tu5")); 
             console.log(this.data)
             let resData=[{
                 name:'温湿指数',
                 value:this.data.data1[1].value+this.data.data1[2].value+this.data.data1[3].value     
                // value:10          
             },{
                 name:'风效指数',
                 value:this.data.data2[3].value,
                 //value:12
             },{
                 name:'舒适度',
                 value:this.data.data3[0].value
                 //value:16
             }
             ]
             let color = [ // 渐变颜色
                        ['#2592FF', '#20a6ff'],
                        ['#F7C23A', '#ffc83c'],
                        ['#7686A3', '#8395b4'],
                        ]
             let series=[]
             for(let i=0;i<resData.length;i++){
                 series.push({
                     type:'pie',
                     clockWise:true,
                     hoverAnimation:false,
                     radius:[78-22*i+'%',68-22*i+'%'],
                     center:['50%','50%'],
                     itemStyle:{
                         normal:{
                             label:{
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             },
                             borderWidth:18
                         }
                     },
                     data:[{
                         name:resData[i].name,
                         value:resData[i].value,
                     },
                     {
                         name:'',
                         value:50-resData[i].value,
                     }
                     ]
                 })
                series.push({
                    name: '',
                    type: 'pie',
                    clockWise: true, //顺时加载
                    z: 3, // 层级，默认为 2，z小的会被z大的覆盖住
                    hoverAnimation: true, // 鼠标移入变大
                    radius: [78 - i * 22 + '%', 68 - i * 22 + '%'], // 圆环
                    center: ['50%', '50%'], // 位置
                    label: {
                        show: false
                    },
                    data: [{ // 阴影的75%
                        value: 7.5,
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        tooltip: {
                            show: false
                        },
                    }, { // 阴影的最后25%，透明
                        value: 2.5,
                        itemStyle: {
                            normal: {
                                color: '#F1F1F1',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            show: false
                        },
                    }]
                })
             }
             var option={
                  tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
               series:series
             }
             myChart.setOption(option);
        }
    },
        mounted() {
        pubsub.subscribe("getTimeData",(msg,data)=>{
            //console.log(data);
            this.month = data;
            this.$root.$emit("updataPieChart",data);
        })
        this.ChartInit()
    },

};
</script>
<style>
#Echart{
    width:100%;
    height:50%;
}
#tu5{
     position:absolute;
    height: 100%;
    width: 100%;
    top: 5%;
}
</style>