<template>
  <div class="Echarts">
    <div id="title" style="font-size:30px">{{month}}月城市情况总览</div>
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
                 name:'温湿舒适占比',
                 value:this.data.data1[3].value+this.data.data1[4].value+this.data.data1[5].value             
             },{
                 name:'风效舒适占比',
                 value:this.data.data2[3].value,
             },{
                 name:'综合舒适占比',
                 value:this.data.data3[0].value
             }
             ]
             console.log(resData[0].value,resData[1].value,resData[2].value)
             let name = resData.map((item) => item.name) // 获取名称
             let value = resData.map((item) => item.value) // 获取数值
             let sum=50/0.75
             let resName=['温湿指数','风效指数','舒适度']
             //let resName2=['温湿其余占比','风效其余占比','综合其余占比']
             let color = [ // 渐变颜色
                        ['#7fa8cf', '#20a6ff'],
                        ['#c5d6ac', '#ffc83c'],
                        ['#e8c867', '#8395b4'],
                        //['#f2c782', '#8395b4'],
                        ]
             let series=[]
             let yAxis = []
             for(let i=0;i<resData.length;i++){
                 series.push({//数据占比圆环
                     type:'pie',
                     clockWise:true,
                     hoverAnimation:false,
                     radius:[68-22*i+'%',58-22*i+'%'],
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
                          itemStyle:{
                             normal:{
                                 color:color[i][0]
                             }
                         }
                     },
                     {
                         name:'',
                         value:sum-resData[i].value,
                         itemStyle:{
                             normal:{
                                 color:"transparent"
                             }
                         },
                         tooltip: {
                            show: false
                        },
                     }
                     ]
                 })
                series.push({//阴影段填充
                    name: '',
                    type: 'pie',
                    clockWise: true, //顺时加载
                    z: 1, // 层级，默认为 2，z小的会被z大的覆盖住
                    hoverAnimation: true, // 鼠标移入变大
                    radius: [68 - i * 22 + '%', 58 - i * 22 + '%'], // 圆环
                    center: ['50%', '50%'], // 位置
                    label: {
                        show: false
                    },
                    data: [{ // 阴影的75%
                        value: 7.5,
                        itemStyle: {
                            normal: {
                               color: '#DCDCDC'
                                //color: 'rgba(0,0,0,0)'
                               // color:color[i][0]
                            }
                        },
                        tooltip: {
                            show: false
                        },
                    }, { // 阴影的最后25%，透明
                        value: 2.5,
                        itemStyle: {
                            normal: {
                                //color: 'rgb(176,201,232)',
                                color: 'rgba(0,0,0,0)',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            show: false
                        },
                    }]
                })
             }
             let percentLIst = [{//设置百分比
                                    value: 0,
                                    name: '0%'
                                }];
            for (let i = 1; i < 11; i++) {
                let item = {
                    value: 1,
                    name: i * 10 + '%'
                }
                percentLIst.push(item)
            }    
            percentLIst.push({ // 阴影的最后25%，透明
                value: 3
            }) 
            series.push({//百分比段
                name: '百分比',
                type: 'pie',
                clockWise: true, //顺时加载
                z: 5, // 层级，默认为 2，z小的会被z大的覆盖住
                hoverAnimation: true, // 鼠标移入变大
                radius: ['81%', '81%'], // 圆环  实现百分比刻度的重点
                center: ['50%', '50%'], // 位置
                itemStyle: {
                    normal: {
                        label: {
                            show: true,//实现百分比刻度的重点
                            color: '#3e3e3e',
                            padding: [0, -15],
                            position: 'inside',//实现百分比刻度的重点
                            align: 'right',
                        },
                        labelLine: {
                            show: false,
                        },
                    }
                },
                data: percentLIst
            })            
             var option={
                  tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255)',
                    textStyle: {
                        color: '#3e3e3e'
                    },
                    padding: [13, 12],
		            extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);',
                    //formatter: "{a} <br/>{b}: {c} ({d}%)"

                    formatter: function(param) { //自定义弹出框的内容
                        param.percent=(param.value/50)*100
                        var res=param.name + ':'+'<br/>' +'   '+param.value+' '+param.percent+'%'
                        console.log(param.percent)
                        //上面自带的百分比是不对的，需要重新计算 再渲染
                    return res;
                }
                },
               	grid: {
                    top: '14%',
                    left: '48%',
                    width: '40%',
                    height: '30%',
                    containlabel: false
                },
                xAxis: [{ // x轴隐藏
                    show: false
                }],
                yAxis: [{ // y轴配置
                    type: 'category',
                    z:6,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        textStyle: {
                            color: '#3e3e3e',
                            fontSize: 14
                        }
                    },      
                    data: resName.reverse()
                }],
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