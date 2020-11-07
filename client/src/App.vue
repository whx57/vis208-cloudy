<template>

  <div id="app">
      <map-box-view class="mapbox-view"></map-box-view>
    <div class="title" @click="touch()">
      <title-chart></title-chart>
    </div>
    <div class="information_recommended">
      <information-recommended
        v-bind:data="chartsData.informationData.data"
        v-bind:focus="chartsData.informationData.focus"></information-recommended>
    </div>
    <div class="temp">
      <ranking-chart
      v-bind:data="chartsData.rankingchartData.data"
      v-bind:focus="chartsData.rankingchartData.focus"></ranking-chart>
    </div>
    <div class="humidity">
      <parallel-coordinates
      v-bind:data="chartsData.parallelchartData.data"
      v-bind:focus="chartsData.parallelchartData.focus"></parallel-coordinates>
    </div>
    <div class="wind_speed">
      <pie-chart
      v-bind:data="chartsData.piechartData.data"
      v-bind:focus="chartsData.piechartData.focus"></pie-chart>
    </div>
    <div class="timeline">
      <time-line></time-line>
    </div>
  </div>
</template>

<script>
import DataProxy from "./datahelper/DataProxy"
import InteractorRcvr from "./interactHelper/interactHelper"
import TimeLine from "./components/TimeLine";
import RankingChart from "./components/RankingChart";
import TitleChart from "./components/TitleChart";
import PieChart from "./components/PieChart";
import ParallelCoordinates from "./components/ParallelCoordinates";
import InformationRecommended from "./components/InformationRecommended";
import PCooordinates from "./components/ParallelCoordinates";
import MapBoxView from "./components/MapBoxView"

import pubsub from "pubsub-js"
export default {
  name: 'App',
  components: {
    // test1,
    TitleChart,
    TimeLine,
    RankingChart,
    // tu3,
    InformationRecommended,
    PieChart,
    ParallelCoordinates,
    PCooordinates,
    MapBoxView,
  },
  data () {
    return {
      month: 1,
      city: '北京市',
      chartsData: {
        baseData:{},
        baseDataD:{},
        informationData:{
          focus: "北京市",
          data:{},
        },
        piechartData:{
          data:{},
          focus:""
        },
        parallelchartData:{
          data:{},
        },
        rankingchartData:{
          data:{},
          focus:""
        },
        mapboxviewData:{
          data:{}, 
          focus:""
        },
      }
    }
  },
  
  mounted: async function() {
      // ---Charts Data Preparation----
      await DataProxy.initChartsData(this.chartsData);

      pubsub.subscribe("getCityData",(msg,data)=>{
        this.city=data;
        // console.log(this.city)
      })

      this.$root.$on("updataInformation",focus=>{
        InteractorRcvr.updataInformation(this.chartsData,focus);
      }),
      this.$root.$on("updataPieChart",focus=>{
        InteractorRcvr.updataPieChart(this.chartsData,focus);
      }),
      
      this.$root.$on("updataParallelChart",focus=>{
        var data=[1,"北京"];
        if(this.chartsData.parallelchartData.focus ==null){
          if(typeof focus==='number'&& !isNaN(focus)){
            data[0]=focus
          }else{
            data[1]=focus
          }
        }else{
          if(typeof focus==='number'&& !isNaN(focus)){
            data=[focus,this.chartsData.parallelchartData.focus[1]]
          }else{
            data=[this.chartsData.parallelchartData.focus[0],focus]
          }
        }
        InteractorRcvr.updataParallelChart(this.chartsData,data);
      }),

      this.$root.$on("updataRankingChart",focus=>{

        InteractorRcvr.updataRankingChart(this.chartsData,focus);
      }),
      this.$root.$on("updataMapBoxView",focus=>{
        InteractorRcvr.updataMapBoxView(this.chartsData,focus);
      })
  },
  methods: {
    touch(){
      console.log(this.chartsData.informationData.data);
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

.mapbox-view {
    /*position: absolute;*/
    top: 0;
    z-index:0;
  }

.title{
  width: 80%;
  height: 5%;
  top:1.5%;
  left: 10%;
  background-color:rgb(255, 255, 255,0.35);
  position: absolute;
  float: top;
  opacity: 0.5;
}

.information_recommended{
  width: 20%;
  height: 50%;
  left: 0.5%;
  top: 7.5%;
  background-color: rgb(255, 255, 255,0.35);
  position: absolute;
  float: left;
  z-index: 1;
}
.temp{
  width: 39.5%;
  height: 40%;
  position: absolute;
  background-color: rgb(255, 255, 255,0.35);
  z-index: 1;
  top: 59%;
  left: 0.5%;
}
.humidity{
  width: 39%;
  height: 40%;
  position: absolute;
  background-color: rgb(255, 255, 255,0.35);
  z-index: 1;
  top: 59%;
  left: 40.5%;
}
.wind_speed{
  width: 20%;
  height: 91%;
  position: absolute;
  background-color: rgb(255, 255, 255,0.35);
  z-index: 1;
  top: 7.5%;
  left: 80%;
}
.timeline{
  width: 58%;
  height: 7%;
  position: absolute;
  top: 51.5%;
  left: 21%;
  background-color: rgb(255, 255, 255,0.35);
  z-index: 1;
  opacity: 0.75;
}
.select_box{
  width: 12%;
  height: 35%;
  float: right;
  top: 10%;
  left: 87%;
  position: absolute;
  background-color: rgb(253, 253, 253);
  /*opacity: 0.25;*/
  z-index: 1;
}
</style>
