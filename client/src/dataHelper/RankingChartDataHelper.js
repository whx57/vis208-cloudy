export default class RankingChartDataHelper{
    static initRankingChartData(baseData,focus){
        return RankingChartDataCalc(baseData)
    }
    static updateRankingChartFocus(baseData,focus){
        return updateRankingChart(baseData,focus)
    }
}

function RankingChartDataCalc(baseData,focus){
    let data = [];
    let dataset = [];
    let final = [];
    for(var i=0;i<baseData.length;i++){
        //判断月份，初始化为1月
        if(baseData[i]['时间'] ==1 ){
            dataset.push({
                city:baseData[i]['市'],
                comfort:Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse:Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff: Number(baseData[i]['K']).toFixed(3),
            })
        }
    }
    for(var i=0;i<dataset.length;i++){
        if(dataset[i]['comfort']<=6.95 &&(dataset[i]['greenhouse']>=55 && dataset[i]['greenhouse']<=75)
            &&(dataset[i]['windeff']>=-800&&dataset[i]['windeff']<=-200)){
            data.push({
                city:dataset[i]['city'],
                comfort:dataset[i]['comfort'],
                greenhouse:dataset[i]['greenhouse'],
                windeff:dataset[i]['windeff']
            })
        }
    }
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data.length;j++){
            if(data[i]['comfort']>data[j]['comfort']){
                var tmp;
                tmp=data[i];data[i]=data[j];data[j]=tmp;
            }
        } 
    }
    //console.log(data)
    for(var i=0;i<data.length;i++){
        final.push(data[i])
    }
    //console.log(final)
    return final
}

function updateRankingChart(baseData,focus){
    let time = focus;
    //console.log(focus)
    let data = [];
    let dataset = [];
    let final = [];
    for(var i=0;i<baseData.length;i++){
        //判断月份，初始化为1月
        if(baseData[i]['时间'] == time ){
            dataset.push({
                city:baseData[i]['市'],
                comfort:Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse:Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff: Number(baseData[i]['K']).toFixed(3),
            })
        }
    }
    for(var i=0;i<dataset.length;i++){
        if(dataset[i]['comfort']<=6.95 &&(dataset[i]['greenhouse']>=55 && dataset[i]['greenhouse']<=75)
            &&(dataset[i]['windeff']>=-800&&dataset[i]['windeff']<=-200)){
            data.push({
                city:dataset[i]['city'],
                comfort:dataset[i]['comfort'],
                greenhouse:dataset[i]['greenhouse'],
                windeff:dataset[i]['windeff']
            })
        }
    }
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data.length;j++){
            if(data[i]['comfort']>data[j]['comfort']){
                var tmp;
                tmp=data[i];data[i]=data[j];data[j]=tmp;
            }
        } 
    }
    //console.log(data)
    if((data.length)<10){
        for(var i=0;i<data.length;i++){
            final.push(data[i])
        }
        //console.log(final)
    }else{
        for(var i=0;i<10;i++){
            final.push(data[i])
        }
        //console.log(final)
    }
    //console.log(final)
    return final
}