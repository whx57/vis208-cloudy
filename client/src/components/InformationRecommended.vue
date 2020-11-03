<template>
 <div class="inf_reco">
    <div id="information">
      <div id="name">城市信息：</div>
      <div id="city">当前选定城市：{{city}}市</div>
      <div id="month">
        <div style="float:left">推荐出游月份：</div> 
        <div v-for="(value,key) in month" :key="key"
        @click="touch(value,key)"
        style="float:left;cursor:pointer"
        :class="monthkey === key ? 'default default-active':'default'">&nbsp;{{value}}月&nbsp;</div> 
      </div>
    </div>
    <div id='month_detail'>
        <div id="comfort">舒适度指数：{{comfort_focus}}</div>
        <div id="greenhouse">温湿指数：{{greenhouse_focus}}</div>
        <div id="windeff">风湿指数：{{windeff_focus}}</div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
const props={
  data:{},
}
export default {
  name: "InformationRecommended",  
  props,
  data() {
    return {
      city:'北京市',
      month:[],
      comfort: [],
      greenhouse: [],
      windeff: [],

      monthkey:0,
      comfort_focus:null,
      greenhouse_focus:null,
      windeff_focus:null,
    };
  },

  methods: {
    touch(val,key){
      for(var i=0;i<this.data.length;i++){
        if(this.month[i]==val){
          this.comfort_focus=this.comfort[i];
          this.greenhouse_focus=this.greenhouse[i];
          this.windeff_focus=this.windeff[i];
        }
      }
      this.monthkey = key
    }
  },
  watch:{
    data:{
      handler(){
        //console.log(this.data)
        this.city = this.data[0]['city'];
        for(var i=0;i<this.data.length;i++){
          this.month[i] = Number(this.data[i].date);
          this.comfort[i] = this.data[i].comfort;
          this.greenhouse[i] = this.data[i].greenhouse;
          this.windeff[i] = this.data[i].windeff;
        }
        this.comfort_focus=this.comfort[0];
        this.greenhouse_focus=this.greenhouse[0];
        this.windeff_focus=this.windeff[0];
        for(var i=0;i<this.month.length;i++){
          for(var j=0;j<this.month.length;j++){
            if(this.month[i]<this.month[j]){
              var temp=this.month[i];this.month[i]=this.month[j];this.month[j]=temp;
            }
          }
        };
        
      }
    }
  },
  mounted() {
    pubsub.subscribe('getCityData',(msg,data)=>{
      this.$root.$emit("updataInformation",data);
    });
  },
}

</script>

<style scoped>
.inf_reco{
  position: absolute;
  width: 100%;
  height: 100%;
}
#city{
/* float: left; */
  font-size: 25px;
  border: 2px solid #00000002;
  border-radius: 8px;
  box-shadow: 10px 10px 10px #00000020;
  position: absolute;
  line-height: 200%;
  top: 15%;
  left: 5%; 
  height: 10%;
}
#month{
/* float: left; */
  position: absolute;
  line-height: 200%;
  top: 30%;
  left: 5%;
  width: 90%;
  height: 10%;
  border: 2px solid #00000002;
  border-radius: 10px;
  font-size: 25px;
  box-shadow: 10px 10px 10px #00000020;
  
}
#name{
    text-align: left;
    font-size: 25px;
    position: absolute;
    top: 2%;
}
#information{
  width: 100%;
  height: 25%;
}
#month_detail{
  width: 90%;
  height: 40%;
  position: absolute;
  top: 45%;
  left: 5%;
  box-shadow: 10px 10px 10px #00000020;
  border-radius: 25px;
}
#comfort{
  position: absolute;
  font-size: 25px;
  top: 5%;
  left: 10%;
}
#greenhouse{
  position: absolute;
  font-size: 25px;
  top: 38%;
  left: 10%;
}
#windeff{
  font-size: 25px;
  position: absolute;
  top: 70%;
  left: 10%;
}
.default{
  color: #404040;
}

.default-active{
  color: #fff;
  background: rgb(51, 151, 233,0.5);
  border-radius: 15px;
}
</style>