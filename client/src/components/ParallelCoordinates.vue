<template>
  <div class="baise">
	  <div style="font-size:23px" id="name">{{city}}市{{month}}月舒适度因素</div>
    <div id="parallel"></div>
  </div>
</template>

<script>
import pubsub from "pubsub-js"
const props={
	data:{}
}
export default {
	data(){
		return{
			city:"北京",
			month:1,
			dataset:[],
			date: 0,
			humidity:0,
			precipitation:0,
			temperture:0,
			visibility:0,
			wind_speed:0
		}
	},
	name: 'ParallelCoordinates',
	props,

	watch:{
		 data:{
            handler(){
				//console.log(this.data)
				this.dataset=[];
				this.date=0;
				this.humidity=0;
				this.precipitation=0;
				this.temperture=0;
				this.visibility=0;
				this.wind_speed=0;
				for(var i=0;i<this.data.length;i++){
					this.city=this.data[i].city
					this.date=this.data[i].date;
					this.humidity=this.data[i].humidity;
					this.precipitation=this.data[i].precipitation;
					this.temperture=this.data[i].temperture;
					this.visibility=this.data[i].visibility;
					this.wind_speed=this.data[i].wind_speed;
					this.dataset[i]=[this.date,this.humidity,this.precipitation,
								this.temperture,this.visibility,this.wind_speed]
				}
				//console.log(this.city)
                this.myEcharts();
            }   
        }
	},
	methods:{
		myEcharts(){
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$echarts.init(document.getElementById('parallel'));
			
			var dataImg=this.dataset,
	
			// 指定图表的配置项和数据
			option = {
				parallelAxis: [
					{dim: 0, name: '日期',inverse:true,nameLocation: 'start',max:31,min:1},
					{dim: 1, name: '相对湿度(%)'},
					{dim: 2, name: '降水量(mm)'},
					{dim: 3, name: '温度℃'},
					{dim: 4, name: '能见度(m)'},
					{dim: 5, name: '风速(m/s)'}
				],
				series: {
					type: 'parallel',
					lineStyle: {
						width: 4,
						color:'#59c4e6'

					},

					data:this.dataset
				}
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	},
	mounted() {
		pubsub.subscribe('getTimeData',(msg,data)=>{
			// if(data.indexOf(this.city) != -1){
			// 	data = data;
			// }else{
			// 	data.push(this.city)
			// }
			// console.log(data)
			this.month = data;
			this.$root.$emit("updataParallelChart",data);
		});
		pubsub.subscribe('getCityData',(msg,data)=>{
			//console.log(123456)
            this.$root.$emit("updataParallelChart",data);
        });
		this.myEcharts();
	}
}
</script>

<style>
.baise{
	
	width: 100%;
	height:100%;
	position: absolute;
}
#parallel{
	width: 100%;
	height:100%;
	top: 5%;
	position: absolute;

}
#name{
	position: absolute;
	left: 1%;

}

</style>