<template>
  <div class="Echarts">
    <div id="title" style="font-size:23px">{{month}}月城市情况总览</div>
    <div class="greenhouse">
        <div id="title1" style="font-size:20px">温湿指数</div>
        <div id="tu5"></div>
    </div>
    <div class="wind">
        <div id="title2" style="font-size:20px">风效指数</div>
        <div id="tu6"></div>
    </div>    
    <div class="comfort">
        <div id="title3" style="font-size:20px">舒适度</div>
        <div id="tu7"></div>
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
            month: 1,
        };
    },
    watch:{
        data:{
            handler(){
                //console.log(this.data)
                this.ChartInit();
                this.ChartInit1();
                this.ChartInit2();
            }  
        }
    },
    methods: {
          ChartInit() {
      var myChart = this.$echarts.init(document.getElementById("tu5"));  
                var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [
                    {
                        // color:['#f6da22','#bbe2e8','#6cacde'],
                        //冷-》热
                        // color:['#AFEEEE','#bbe2e8','#6cacde','#79CDCD','#B4EEB4','#dec768','#d9c092','#d9a092','#FF8C69'],
                        color:['#204098','#3860a0','#6088c8','#90b0c0','#90a0a0','#d0b878','#c1896e','#a2807e','#945657'],
                        name:'  温湿指数',
                        type:'pie',
                        selectedMode: 'single',
                        radius: ['20%', '70%'],

                        label: {
                            normal: {
                                show: true,
                                fontSize: 15,
                               color:'#406098',
                                fontFamily:'Microsoft Yahei',
                                avoidLabelOverlap: true,
                            }
                        },
                        data: this.data.data1
                    },
                ]
            };  
            
            myChart.setOption(option);
                     
          },
            ChartInit1() {
        var myChart1 = this.$echarts.init(document.getElementById("tu6"));
          var option1 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [  

                                  {
                        name:' 风效指数',
                        type:'pie',
                        radius: ['20%', '70%'],
                        //酷冷到-》热
                        // color:['#FF4040','#CAFF70','#FFF68F','#FF6347','#CD5555'],
                        //   color:['#00BFFF','#bbe2e8','#6cacde','#76EEC6','#CAFF70','#f6da22','#FF7256','#EE4000','red'],
                        //   color:['black','#bbe2e8','#6cacde','#79CDCD','#B4EEB4','#dec768','#d9c092','red'],
                      color:['#204098','#3860a0','#6088c8','#90b0c0','#90a0a0','#d0b878','#c1896e','#a2807e','#945657'],
                        label: {
                            normal: {
                                show: true,
                                // position:'inside',
                                align:'right',
                                fontSize: 15,
                                fontFamily:'Microsoft YaHei',
                                color:'#406098',
                                avoidLabelOverlap: true,
                            },
                                        },
                        data: this.data.data2
                    },
                ]};
              myChart1.setOption(option1); 
            },
        ChartInit2() {      
        var myChart2 = this.$echarts.init(document.getElementById("tu7"));
      
        var option2 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },

                series: [  
                                        {
                        name:' 舒适度',
                        type:'pie',
                        radius: ['20%', '70%'],
                        //舒服 -》不舒服
                        // color:['#76EEC6','#CAFF70','#f6da22','#FF7256','#EE4000'],
                        //   color:['black','#bbe2e8','#6cacde','#79CDCD','#B4EEB4','red'],
                    color:['#90a0a0','#d0b878','#90b0c0','#6088c8','#3860a0','#204098'],
                  
                        label: {
                            normal: {
                                show: true,
                                // position: 'inside',
                                fontSize: 15,
                                fontFamily:'Microsoft YaHei',
                                color:'#406098',
                                avoidLabelOverlap: true,
                            }
                        },
                        data:this.data.data3
                    },

                ]};
                myChart2.setOption(option2);
        },
        
    },
    mounted() {
        pubsub.subscribe("getTimeData",(msg,data)=>{
            //console.log(data);
            this.month = data;
            this.$root.$emit("updataPieChart",data);
        })
        this.ChartInit()
         this.ChartInit1()
          this.ChartInit2()
    },


};
</script>
<style>
#Echarts{
    width: 100%;
    height: 100%;
}
#tu5{
    position:absolute;
    height: 30%;
    width: 100%;
    top: 9%;
}
#tu6{
    position:absolute;
    height: 30%;
    width: 100%;
    top: 43%;
}
#tu7{
    position:absolute;
    height: 30%;
    width: 100%;
    top: 72%;
}
#title1{
       position:absolute;
    left:5%;
    top: 4%;
}
#title2{
        position:absolute;
    left:5%;
    top: 38%;
}
#title3{
        position:absolute;
 
    left:5%;
    top: 70%;
}

</style>
