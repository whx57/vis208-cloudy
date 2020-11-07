<template>
    <div id="slider">
        <div id="month" v-for="(item,index) of (1,12)" :key="index" @click="choose(index)" style="cursor:pointer">
            <p :for="index">{{item}}月</p>
        </div>
    </div>
</template>
<script>
import pubsub from "pubsub-js"
export default {
    name:"TimeLine",
    data() {
        return{

        } 
    },
    mounted(){
    },
    methods:{
        choose:function(index){
            var date = index+1;
            pubsub.publish("getTimeData",date);
            // console.log(typeof(date))
        }
            
    }
}
</script>
<style scoped>
#slider{
    width: 100%;
    height:100%;
    position: absolute;
    /*background-color:rgb(142, 207, 209);*/
}
#month{
    float: left;
    width: 6%;
    height: 100%;
    margin-left: 2.3%;
    background-color: rgb(173, 225, 235);
    border-radius: 50%;
    transition: 1s;
    opacity: 0.5;
    text-align: center;
}
p{
    font-size: 25px;
    line-height:100%;
}
#month:hover{
    transition: 1s;
    opacity: 1;
}
</style>