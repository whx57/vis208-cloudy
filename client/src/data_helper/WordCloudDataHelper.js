export default class WordCloudDataHelper{
    static initWordCloudData(baseData){
        return WordCloudDataCalc(baseData)
    }
    static updateWordCloudFocus(baseData,focus){
        return updateWordCloud(baseData,focus)
    }
}

function WordCloudDataCalc(baseData){
    let dataset = []
    for(var i=0;i<baseData.length;i++){
        if(baseData[i]['city']=='北京'){
            dataset.push({
                name:baseData[i]['name'],
                value:baseData[i]['value']
            })
        }
    }
    return dataset
}

function updateWordCloud(baseData,focus){
    let dataset = [];
    let localcity = focus;
    if(localcity == '大理白族自治'){
        localcity = "大理";
    }else{
        localcity = localcity;
    }
    for(var i=0;i<baseData.length;i++){
        if(baseData[i]['city']==localcity){
            dataset.push({
                name:baseData[i]['name'],
                value:baseData[i]['value']
            })
        }
    }
    return dataset
}
