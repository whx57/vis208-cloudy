<template>
    <div>
        <div class="tital">{{city}}市旅游景点词云</div>
        <div id="word_cloud"></div>
    </div>  
</template>

<script>
import 'echarts-wordcloud';
import pubsub from "pubsub-js"
const props={
    data:{},
}
export default {
    name: "WordCloud",
    props,
    data () {
        return {
            dataset:[],
            city:'北京',
        }
    },
    watch:{
        data:{
            handler(){
                this.dataset=this.data
                // console.log(this.data)
                this.ChartInit();
            }, 
        }
    },
    methods:{
		ChartInit(){
			// 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('word_cloud'));
            var option = {
                tooltip: {
                    show: true
                },
                series: [{
                    // name: '热点分析',//数据提示窗标题
                    type: 'wordCloud',
                    sizeRange: [6, 50],//画布范围，如果设置太大会出现少词（溢出屏幕）
                    rotationRange: [-45, 90],//数据翻转范围
                    //shape: 'circle',
                    textPadding: 0,
                    left: 'center',
                    top: 'center',
                    width:'90%',
                    height:'100%',
                    autoSize: {
                        enable: true,
                        minSize: 6
                    },
                    drawOutOfBound: false,//词云显示完整，超出画布的也显示
                    textStyle: {
                        normal: {
                            color: function() {
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },
                    data: this.dataset
                }]
            };
            myChart.setOption(option);
		}
    },
    mounted () {
        pubsub.subscribe('getCityData',(msg,data)=>{
			this.city = data;
            this.$root.$emit("updataWordCloud",data);
        });
		this.ChartInit();
    },
}
</script>

<style>
.tital{
    font-size: 25px;
}
#word_cloud{
    position: absolute;
    top: 15%;
    height: 80%;
    width: 100%;
}
</style>
