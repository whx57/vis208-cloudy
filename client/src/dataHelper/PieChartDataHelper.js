export default class PieChartDataHelper{
    static initPieChartData(baseData){
        return PieChartDataCalc(baseData)
    }
    static updatePieChartFocus(baseData,focus){
        return updatePieChart(baseData,focus)
    }
}
function PieChartDataCalc(baseData){
    let dataset = []
    var data = {
        data1:[{name:"极冷，极不舒适",value: 0}, {name:"寒冷、不舒适",value: 0},{name:"偏冷、较不舒适",value: 0},
                {name:"清、舒适",value: 0},{name:"凉、非常舒适",value: 0},{name:"暖、舒适",value: 0},
                {name:"偏热、较舒适",value: 0},{name:"闷热、不舒适",value: 0},{name:"极闷热、极不舒适",value: 0}],
        data2:[{name:"酷冷",value: 0},{name:"冷",value: 0},{name:"冷凉",vvalue: 0},{name:"凉",value: 0},
                {name:"舒适",value: 0},{name:"暖",value: 0},{name:"暖热",value: 0},{name:"热",value: 0},
                {name:"炎热",value: 0}],
        data3:[{name:"非常舒适",value: 0},{name:"舒适",value: 0},{name:"较舒适",value: 0},
                {name:"较不舒适",value: 0},{name:"不舒适",value: 0},{name:"极不舒适",value: 0}]
    }
    for(var i=0;i<baseData.length;i++){
        //判断月份，初始化为1月
        if(baseData[i]['时间'] ==1 ){
            dataset.push({
                city:baseData[i]['市'],
                comfort:Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse:Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff:Number(baseData[i]['K']).toFixed(3),
            })
        }
    }
    for(var i=0;i<dataset.length;i++){
        if(dataset[i].greenhouse<40){
            data.data1[0].value+=1;
        }else if(dataset[i].greenhouse>=40&&dataset[i].greenhouse<45){
            data.data1[1].value+=1;
        }else if(dataset[i].greenhouse>=45&&dataset[i].greenhouse<55){
            data.data1[2].value+=1;
        }else if(dataset[i].greenhouse>=55&&dataset[i].greenhouse<60){
            data.data1[3].value+=1;
        }else if(dataset[i].greenhouse>=60&&dataset[i].greenhouse<65){
            data.data1[4].value+=1;
        }else if(dataset[i].greenhouse>=65&&dataset[i].greenhouse<70){
            data.data1[5].value+=1;
        }else if(dataset[i].greenhouse>=70&&dataset[i].greenhouse<75){
            data.data1[6].value+=1;
        }else if(dataset[i].greenhouse>=75&&dataset[i].greenhouse<80){
            data.data1[7].value+=1;
        }else{
            data.data1[8].value+=1;
        }

        if (dataset[i].windeff< -1200){
            data.data2[0].value +=1;
        }else if(dataset[i].windeff>=-1200&&dataset[i].windeff< -1000){
            data.data2[1].value +=1;
        }else if(dataset[i].windeff>=-1000&&dataset[i].windeff< -800){
            data.data2[2].value +=1;
        }else if(dataset[i].windeff>=-800&&dataset[i].windeff<-600){
            data.data2[3].value +=1;
        }else if(dataset[i].windeff>=-600&&dataset[i].windeff<-300){
            data.data2[4].value +=1;
        }else if(dataset[i].windeff>=-300&&dataset[i].windeff<-200){
            data.data2[5].value +=1;
        }else if(dataset[i].windeff>=-200&&dataset[i].windeff<-50){
            data.data2[6].value +=1;
        }else{
            data.data2[7].value +=1;
        }

        if(dataset[i].comfort<=4.55){
            data.data3[0].value +=1
        }else if(dataset[i].comfort>4.55&&dataset[i].comfort<=5.75){
            data.data3[1].value +=1
        }else if(dataset[i].comfort>5.75&&dataset[i].comfort<=6.95){
            data.data3[2].value +=1
        }else if(dataset[i].comfort>6.95&&dataset[i].comfort<=7.95){
            data.data3[3].value +=1
        }else if(dataset[i].comfort>7.95&&dataset[i].comfort<=9){
            data.data3[4].value +=1
        }else{
            data.data3[5].value +=1
        }
    }
    //console.log(data)
    return data
}

function updatePieChart(baseData,focus){
    let dataset = [];
    let time = focus;
    var data = {
        data1:[{name:"极冷，极不舒适",value: 0}, {name:"寒冷、不舒适",value: 0},{name:"偏冷、较不舒适",value: 0},
                {name:"清、舒适",value: 0},{name:"凉、非常舒适",value: 0},{name:"暖、舒适",value: 0},
                {name:"偏热、较舒适",value: 0},{name:"闷热、不舒适",value: 0},{name:"极闷热、极不舒适",value: 0}],
        data2:[{name:"酷冷",value: 0},{name:"冷",value: 0},{name:"冷凉",vvalue: 0},{name:"凉",value: 0},
                {name:"舒适",value: 0},{name:"暖",value: 0},{name:"暖热",value: 0},{name:"热",value: 0},
                {name:"炎热",value: 0}],
        data3:[{name:"非常舒适",value: 0},{name:"舒适",value: 0},{name:"较舒适",value: 0},
                {name:"较不舒适",value: 0},{name:"不舒适",value: 0},{name:"极不舒适",value: 0}]
    }
    for(var i=0;i<baseData.length;i++){
        //判断月份，初始化为1月
        if(baseData[i]['时间'] == time ){
            dataset.push({
                city:baseData[i]['市'],
                comfort:Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse:Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff:Number(baseData[i]['K']).toFixed(3),
            })
        }
    }
    for(var i=0;i<dataset.length;i++){
        if(dataset[i].greenhouse<40){
            data.data1[0].value+=1;
        }else if(dataset[i].greenhouse>=40&&dataset[i].greenhouse<45){
            data.data1[1].value+=1;
        }else if(dataset[i].greenhouse>=45&&dataset[i].greenhouse<55){
            data.data1[2].value+=1;
        }else if(dataset[i].greenhouse>=55&&dataset[i].greenhouse<60){
            data.data1[3].value+=1;
        }else if(dataset[i].greenhouse>=60&&dataset[i].greenhouse<65){
            data.data1[4].value+=1;
        }else if(dataset[i].greenhouse>=65&&dataset[i].greenhouse<70){
            data.data1[5].value+=1;
        }else if(dataset[i].greenhouse>=70&&dataset[i].greenhouse<75){
            data.data1[6].value+=1;
        }else if(dataset[i].greenhouse>=75&&dataset[i].greenhouse<80){
            data.data1[7].value+=1;
        }else{
            data.data1[8].value+=1;
        }

        if (dataset[i].windeff< -1200){
            data.data2[0].value +=1;
        }else if(dataset[i].windeff>=-1200&&dataset[i].windeff< -1000){
            data.data2[1].value +=1;
        }else if(dataset[i].windeff>=-1000&&dataset[i].windeff< -800){
            data.data2[2].value +=1;
        }else if(dataset[i].windeff>=-800&&dataset[i].windeff<-600){
            data.data2[3].value +=1;
        }else if(dataset[i].windeff>=-600&&dataset[i].windeff<-300){
            data.data2[4].value +=1;
        }else if(dataset[i].windeff>=-300&&dataset[i].windeff<-200){
            data.data2[5].value +=1;
        }else if(dataset[i].windeff>=-200&&dataset[i].windeff<-50){
            data.data2[6].value +=1;
        }else{
            data.data2[7].value +=1;
        }

        if(dataset[i].comfort<=4.55){
            data.data3[0].value +=1
        }else if(dataset[i].comfort>4.55&&dataset[i].comfort<=5.75){
            data.data3[1].value +=1
        }else if(dataset[i].comfort>5.75&&dataset[i].comfort<=6.95){
            data.data3[2].value +=1
        }else if(dataset[i].comfort>6.95&&dataset[i].comfort<=7.95){
            data.data3[3].value +=1
        }else if(dataset[i].comfort>7.95&&dataset[i].comfort<=9){
            data.data3[4].value +=1
        }else{
            data.data3[5].value +=1
        }
    }
    //console.log(data)
    return data
}