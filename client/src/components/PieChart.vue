<template>
  <div class="Echarts">
      <div id="title">当月城市情况总览</div>
      <div id="tu5">
          <!-- wuxi -->
   </div>
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
    name: "PieChart",
    props,
    data() {
        return {
        };
    },
    watch:{
        data:{
            handler(){
                //console.log(this.data)
                this.ChartInit();
            }  
        }
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
                                fontSize: 15,
                                color:'',
                                fontFamily:'Microsoft Yahei'
                            }
                        },
                        data: this.data.data1
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
                        data: this.data.data2
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
                        data:this.data.data3
                    }
                ]
            };
            myChart.setOption(option);
        },
        
    },
    mounted() {
        pubsub.subscribe("getTimeData",(msg,data)=>{
            //console.log(data);
            this.$root.$emit("updataPieChart",data);
        })
        this.ChartInit()
    },


};
</script>
<style>
#tu5{
    position:absolute;
    height: 90%;
    width: 100%;
    top: 10%;
}
</style>
