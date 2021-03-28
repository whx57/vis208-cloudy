<template>
 <div class="inf_reco">
    <div id="information">
      <div id="name" >城市信息：</div>
      <div id="city">当前选定城市：{{city}}市&nbsp;&nbsp;</div>
      <div id="month">
        <div style="float:left">推荐出游月份：</div>
        <div id="month_recommend">
          <div v-for="(value,key) in month" :key="key"
            @click="touch(value,key)"
            style="float:left;cursor:pointer"
            :class="monthkey === key ? 'default default-active':'default'">&nbsp;{{value}}月&nbsp;</div> 
          </div>
        </div>

    </div>
    <div id='month_detail'>
        <div id="comfort">
          <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <el-table :data="comfortData">
            <el-table-column width="150" property="range" label="范围"></el-table-column>
            <el-table-column width="100" property="feelings" label="感觉程度"></el-table-column>
          </el-table>
          <el-button style="pointer-events: auto;" slot="reference" size="medium">舒适度指数：{{comfort_focus}}</el-button>
          </el-popover>
          </div>
        <div id="greenhouse">
          <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <el-table :data="greenhouseData">
            <el-table-column width="150" property="range" label="范围"></el-table-column>
            <el-table-column width="100" property="feelings" label="感觉程度"></el-table-column>
          </el-table>
          <el-button style="pointer-events: auto;" slot="reference" size="medium">温湿指数：{{greenhouse_focus}}</el-button>
          </el-popover>
          </div>
        <div id="windeff">
           <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <el-table :data="wideffData">
            <el-table-column width="150" property="range" label="范围"></el-table-column>
            <el-table-column width="100" property="feelings" label="感觉程度"></el-table-column>
          </el-table>
          <el-button style="pointer-events: auto;" slot="reference" size="medium">风湿指数：{{windeff_focus}}</el-button>
          </el-popover>
          </div>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
const props={
  data:{},
}
export default {
  name: "InformationRecommended",  
  props,
  data() {
    return {
      city:'北京',
      month:[],
      comfort: [],
      greenhouse: [],
      windeff: [],
      monthkey:0,
      comfort_focus:null,
      greenhouse_focus:null,
      windeff_focus:null,
      comfortData: [{
          range: '≤4.55',
          feelings: '非常舒适',
          
        }, {
          range: '4.55~5.75',
          feelings: '舒适',
          
        }, {
          range: '5.75~6.95',
          feelings: '较舒适',
          
        }, {
          range: '6.95~7.95',
          feelings: '较不舒适',
          
        },{
          range: '7.95~9.00',
          feelings: '不舒适',
          
        },{
          range: '>9.00',
          feelings: '极不舒适',
          
        }],
        greenhouseData: [{
          range: '<40',
          feelings: '极冷，极不舒适',
          
        }, {
          range: '40~45',
          feelings: '寒冷，不舒适',
          
        }, {
          range: '45~55',
          feelings: '偏冷，较不舒适',
          
        }, {
          range: '55~60',
          feelings: '清，舒适',
          
        },{
          range: '60~65',
          feelings: '凉，非常舒适',
          
        },{
          range: '65~70',
          feelings: '暖，舒适',
          
        },{
          range: '70~75',
          feelings: '偏热，较舒适',
          
        },{
          range: '75~80',
          feelings: '闷热，不舒适',
          
        },{
          range: '>80',
          feelings: '极闷热，极不舒适',
          
        }],
        wideffData: [{
          range: '<-1200',
          feelings: '酷冷',
          
        }, {
          range: '-1000~-1200',
          feelings: '冷',
          
        }, {
          range: '-800~-1000',
          feelings: '冷凉',
          
        }, {
          range: '-600~-800',
          feelings: '凉',
          
        },{
          range: '-300~-600',
          feelings: '舒适',
          
        },{
          range: '-200~-300',
          feelings: '暖',
          
        },{
          range: '-50~-200',
          feelings: '暖热',
          
        },{
          range: '80~-50',
          feelings: '热（t<32.8℃）',
          
        },{
          range: '>80',
          feelings: '炎热（t<32.8℃）',
          
        }]
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
    },
  },
  watch:{
    data:{
      handler(){
        //console.log(this.data)
        this.month = []
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
      if(data == '大理白族自治'){
          this.city = "大理";
      }else{
          this.city = data;
      }
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
  height: auto;
  border: 2px solid #00000002;
  border-radius: 10px;
  font-size: 25px;
  box-shadow: 10px 10px 10px #00000020;
  
}
#name{
    left:1%;
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
  top: 55%;
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
  background:#78a0c8;
  border-radius: 15px;
}

.el-button--medium {
    padding: 10px 20px;
    font-size: 30px;
    /* border-radius: 4px; */
}

.el-button {
background:#b0c9e8;
border: 0px;
}



</style>