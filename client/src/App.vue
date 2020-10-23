<template>

  <div id="app">

     <div></div>
    <!--<img src="./assets/logo.png">-->
    <!--<router-view/>-->
    <div class="map_box" @click="touch()">
      <!--地图-->
    </div>
    <div class="title">
      <!--标题-->
      <div>         <title></title>  </div>
      <div id="headers" >
        <h4 >气象可视化</h4>
      </div>



    </div>
    <div class="information_recommended">
      <!--消息推荐-->
    <div> 
      <inf_re></inf_re>
    </div>

    </div>
    <div class="temp">
      <h3 style=" text-align: center;">50城市前10排名</h3>
      <!--温度-->
      <div>    <ranking></ranking>       </div>
    </div>
    <div class="humidity">
      <!--湿度-->
        <div>         <ParallelCoordinates></ParallelCoordinates>  </div> 
    </div>
    <div class="wind_speed">
      <PCooordinates/>
      <!--风力等级-->
      <div>         <percent></percent>  </div> 
    </div>
    <div class="timeline">
      <!--时间轴-->
      <div><timeline></timeline></div>
    </div>
    <!-- <div class="select_box"> -->
      <!--选择栏-->
    <!-- </div> -->
  </div>
</template>

<script>
import DataProxy from "./datahelper/DataProxy"
<<<<<<< HEAD
import timeline from "./components/timeline";
import ranking from "./components/ranking";
import title from "./components/title";
import percent from "./components/percent";
import ParallelCoordinates from "./components/ParallelCoordinates";
import inf_re from "./components/inf_re";
=======
import PCooordinates from "./components/ParallelCoordinates";
>>>>>>> 39ace79a05cfd19361dc371464dea7f095d2a128
export default {
  name: 'App',
  components: {
    // test1,
    title,
    timeline,
    ranking,
    // tu3,
    inf_re,
    percent,
    ParallelCoordinates
    
  },
  data () {
    return {
      chartsData: {
        baseData:{}
      }
    }
  },
  components:{
     PCooordinates
  },
  mounted: async function() {
      // ---Charts Data Preparation----
      await DataProxy.initChartsData(this.chartsData);
  },
  methods: {
    touch(){
      console.log(this.chartsData);
    }
  }
}
</script>

<style>
#app {
    width: auto;
    height: auto;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    z-index: -1;
  }
body {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

.map_box{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  background-color: #2C3E50;
}

.title{
  width: 80%;
  height: 5%;
  top:1.5%;
  left: 10%;
  background-color: cornsilk;
  position: absolute;
  float: top;
  opacity: 1;
}

.information_recommended{
  width: 20%;
  height: 50%;
  left: 0.5%;
  top: 7.5%;
  background-color: cornsilk;
  position: absolute;
  float: left;
  z-index: 1;
  opacity: 1;
}
.temp{
  width: 32.5%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 1;
  z-index: 1;
  top: 59%;
  left: 0.5%;
}
.humidity{
  width: 39%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 1;
  z-index: 1;
  top: 59%;
  left: 33.5%;
}
.wind_speed{
  width: 25%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 1;
  z-index: 1;
  top: 59%;
  left: 73%;
}
.timeline{
  width: 60%;
  height: 6%;
  position: absolute;
  top: 51.5%;
  left: 25%;
  background-color: cornsilk;
  opacity: 0.25;
  z-index: 1;
}
.select_box{
  width: 12%;
  height: 35%;
  float: right;
  top: 10%;
  left: 87%;
  position: absolute;
  background-color: cornsilk;
  opacity: 0.25;
  z-index: 1;
}#headers {
  position: absolute;
  top: 0.1%;
  left: 0.1%;
  width: 99.7%;
  height: 5%;
  border: 1px solid white;
  background-color: #30313a;
  text-align: center;
  color: #ccc;
}
#headers h4 {
  position: absolute;
  margin: 0;
  padding: 0;
  top: 30%;
  left: 45%;
  font-size: 30px;
}
</style>
