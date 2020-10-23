
  
<template>
  <div class="Echarts">
	  <h3 style=" text-align: center;"> 城市月舒适度因素</h3>
    <div id="parallel" style="width: 720px;height:300px;">
	</div>
  </div>
</template>

<script>
export default {
	data(){
		return{
			  dataOne :[
            [12, 55, 23, 51,3],
            [9, 80, 31, 20,4],
			[20, 60, 20, 30,1],
			[15, 45, 17, 40,2],
            [1, 67, 15, 25,0],
            [31,22, 28, 11,3]
		]
		}

	},
  name: 'Echarts',
  methods:{
	  myEcharts(){
		  // 基于准备好的dom，初始化echarts实例
		  var myChart = this.$echarts.init(document.getElementById('parallel'));
		  
		 var dataImg=this.dataOne,
   
		  // 指定图表的配置项和数据
		   option = {
			  parallelAxis: [
        	{dim: 0, name: '日期',inverse: true, max: 31, min:1,nameLocation: 'start'},
        	{dim: 1, name: '温度℃'},
			{dim: 2, name: '湿度'},
			{dim: 3, name: '空气质量'},
			{dim: 4, name: '风速'}
    ],
    series: {
        type: 'parallel',
        lineStyle: {
            width: 4
        },
        data:this.dataOne
    }
		  };

		  // 使用刚指定的配置项和数据显示图表。
		  myChart.setOption(option);
		  }
  },
  mounted() {
  	this.myEcharts();
  }
}
</script>

<style>

</style>