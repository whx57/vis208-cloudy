export default class InformationDataHelper{
    static initInformationData(baseData){
        return InformationDataCalc(baseData)
    }
    static updateInformationFocus(baseData,focus){
        return updateInformation(baseData,focus)
    }
}

function InformationDataCalc(baseData){
    let data =[];
    let dataset = [];
    for(var i=0;i<baseData.length;i++){
        if(baseData[i]['市']=='北京'){
            dataset.push({
                city: baseData[i]['市'],
                date: baseData[i]['时间'],
                comfort: Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse: Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff: Number(Number(baseData[i]['K']).toFixed(3)),
            })
        }
    }
    //console.log(dataset)
    for(var i=0;i<dataset.length;i++){
        if(dataset[i]['comfort']<=6.95){
            data.push({
                city:dataset[i]['city'],
                date:dataset[i]['date'],
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
    return data
}

function updateInformation(baseData,focus){
    let city = focus;
    let data =[];
    let dataset = [];
    if(city == '大理白族自治'){
        city = "大理";
    }else{
        city = city;
    }
    for(var i=0;i<baseData.length;i++){
        if(baseData[i]['市']== city){
            dataset.push({
                city: baseData[i]['市'],
                date: baseData[i]['时间'],
                comfort: Math.abs(Number(baseData[i]['S']).toFixed(3)),
                greenhouse: Math.abs(Number(baseData[i]['THI']).toFixed(3)),
                windeff: Number(Number(baseData[i]['K']).toFixed(3)),
            })
        }
    }
    //console.log(dataset)
    for(var i=0;i<dataset.length;i++){
        if(dataset[i]['comfort']<=6.95){
            data.push({
                city:dataset[i]['city'],
                date:dataset[i]['date'],
                comfort:dataset[i]['comfort'],
                greenhouse:dataset[i]['greenhouse'],
                windeff:dataset[i]['windeff']
            })
        }
    }
    if(isnull(data)){
        for(var i=0;i<dataset.length;i++){
            if(dataset[i]['comfort']<=6.95 &&(dataset[i]['greenhouse']>=55 && dataset[i]['greenhouse']<=75)){
                data.push({
                    city:dataset[i]['city'],
                    date:dataset[i]['date'],
                    comfort:dataset[i]['comfort'],
                    greenhouse:dataset[i]['greenhouse'],
                    windeff:dataset[i]['windeff']
                })
            }
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
    return data
}

function isnull(obj){
    for(var key in obj) {
        return false;
    }
    return true;
  }