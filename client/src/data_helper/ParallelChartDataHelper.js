export default class ParallelChartDataHelper{
    static initParallelChartData(baseDataD){
        return ParallelChartDataCalc(baseDataD)
    }
    static updateParallelChartFocus(baseDataD,focus){
        return updateParallelChart(baseDataD,focus)
    }
}

function ParallelChartDataCalc(baseDataD){
    let data = []
    //console.log(baseDataD)
    //console.log(DataConversion('101')==1)
    for(var i=0;i<baseDataD.length;i++){
        //console.log('+++++++++++++')
        if(DataConversion(baseDataD[i]['时间'])== 1 && baseDataD[i]['市']=='北京'){
            //console.log('+++++++++++++')
            data.push({
                city: baseDataD[i]['市'],
                date: Number((baseDataD[i]['时间']).substring(1,3)),
                temperture: Number(baseDataD[i]['温度(摄氏度)']),
                humidity: Number(baseDataD[i]['相对湿度(百分率)']),
                visibility: Number(baseDataD[i]['能见度(米)']),
                precipitation: Number(baseDataD[i]['降水量(毫米)']),
                wind_speed: Number(baseDataD[i]['风速(米/秒)'])
            })
        }
    }
    //console.log(data)
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data.length;j++){
            if(data[i]['date']>data[i]['date']){
                var tmp;
                tmp=data[i];data[i]=data[j];data[j]=tmp;
            }
        }
    }
    //console.log(data)
    return data
}

function updateParallelChart(baseDataD,focus){
    // console.log("++++++++++++")
    let data = []
    let time = focus[0];
    let city = focus[1];
    //console.log(time,city)
    if(city == '大理白族自治'){
        city = "大理";
    }else{
        city = city;
    }
    if(time < 10){
        for(var i=0;i<baseDataD.length;i++){
            //console.log('+++++++++++++')
            if(DataConversion(baseDataD[i]['时间']) == time && baseDataD[i]['市']== city){
                //console.log('+++++++++++++')
                data.push({
                    city:baseDataD[i]['市'],
                    date: Number((baseDataD[i]['时间']).substring(1,3)),
                    temperture: Number(baseDataD[i]['温度(摄氏度)']),
                    humidity: Number(baseDataD[i]['相对湿度(百分率)']),
                    visibility: Number(baseDataD[i]['能见度(米)']),
                    precipitation: Number(baseDataD[i]['降水量(毫米)']),
                    wind_speed: Number(baseDataD[i]['风速(米/秒)'])
                })
            }
        }
    }else{
        for(var i=0;i<baseDataD.length;i++){
        //console.log('+++++++++++++')
            if(DataConversion(baseDataD[i]['时间']) == time && baseDataD[i]['市']== city){
                //console.log('+++++++++++++')
                data.push({
                    city: baseDataD[i]['市'],
                    date: Number((baseDataD[i]['时间']).substring(2,4)),
                    temperture: Number(baseDataD[i]['温度(摄氏度)']),
                    humidity: Number(baseDataD[i]['相对湿度(百分率)']),
                    visibility: Number(baseDataD[i]['能见度(米)']),
                    precipitation: Number(baseDataD[i]['降水量(毫米)']),
                    wind_speed: Number(baseDataD[i]['风速(米/秒)'])
                })
            }
        }
    }
    for(var i=0;i<data.length;i++){
        for(var j=0;j<data.length;j++){
            if(data[i]['date']>data[i]['date']){
                var tmp;
                tmp=data[i];data[i]=data[j];data[j]=tmp;
            }
        }
    }
    return data
}

function DataConversion(value){
    if(value.length==3){
        return value.substring(0,1)
    }else{
        return value.substring(0,2)
    }
}