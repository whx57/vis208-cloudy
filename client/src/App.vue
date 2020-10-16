<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view/>-->
    <div class="map_box" @click="touch()">
      <!--地图-->
    </div>
    <div class="title">
      <!--标题-->
    </div>
    <div class="information_recommended">
      <!--消息推荐-->
    </div>
    <div class="temp">
      <!--温度-->
    </div>
    <div class="humidity">
      <!--湿度-->
    </div>
    <div class="wind_speed">
      <!--风力等级-->
    </div>
    <div class="timeline">
      <!--时间轴-->
    </div>
    <div class="select_box">
      <!--选择栏-->
    </div>
  </div>
</template>

<script>
import DataProxy from "./datahelper/DataProxy"

export default {
  name: 'App',
  components: {
    
  },
  data () {
    return {
      chartsData: {
        baseData:{}
      }
    }
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
  opacity: 0.25;
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
  opacity: 0.25;
}
.temp{
  width: 32.5%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 0.25;
  z-index: 1;
  top: 59%;
  left: 0.5%;
}
.humidity{
  width: 33%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 0.25;
  z-index: 1;
  top: 59%;
  left: 33.5%;
}
.wind_speed{
  width: 32.5%;
  height: 40%;
  position: absolute;
  background-color: cornsilk;
  opacity: 0.25;
  z-index: 1;
  top: 59%;
  left: 67%;
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
}
</style>
