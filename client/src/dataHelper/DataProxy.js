import ServerDataProvider from './ServerDataProvider';

import InformationDataHelper from './InformationDataHelper'
import PieChartDataHelper from './PieChartDataHelper'
import ParallelChartDataHelper from './ParallelChartDataHelper'
import RankingChartDataHelper from './RankingChartDataHelper'
import MapBoxViewDataHelper from './MapBoxViewDataHelper'

export default class DataProxy {
    static async initChartsData (chartsData){
        ServerDataProvider.getCity_month().then(
            (response) => {
                chartsData.baseData = response.data;

                chartsData.informationData.data = this.initInformationData(
                    chartsData['baseData'],
                    chartsData['informationData'].focus
                ),
                chartsData.piechartData.data = this.initPieChartData(
                    chartsData['baseData'],
                    chartsData['piechartData'].focus
                ),
                chartsData.mapboxviewData.data = this.initMapBoxViewData(
                    chartsData['baseData'],
                    chartsData['mapboxviewData'].focus
                )
                chartsData.rankingchartData.data = this.initRankingChartData(
                    chartsData['baseData'],
                    chartsData['rankingchartData'].focus
                )
                //console.log(chartsData)
                return chartsData
            },(error)=>{
                console.log('......................')
            }
        )
        ServerDataProvider.getCity_day().then(
            (response)=>{
                chartsData.baseDataD = response.data;

                chartsData.parallelchartData.data = this.initParallelChartData(
                    chartsData['baseDataD']
                )
                //console.log(chartsData)
                return chartsData
            },(error)=>{
                console.log('......................')
            }
        )
    }
    //初始化数据
    static initInformationData(baseData,focus){
        return InformationDataHelper.initInformationData(baseData,focus);
    }
    //更新数据
    static updateInformationFocus(baseData,focus){
        return InformationDataHelper.updateInformationFocus(baseData,focus);
    }

    static initPieChartData(baseData,focus){
        return PieChartDataHelper.initPieChartData(baseData,focus);
    }
    static updatePieChartFocus(baseData,focus){
        return PieChartDataHelper.updatePieChartFocus(baseData,focus);
    }

    static initParallelChartData(baseDataD,focus){
        return ParallelChartDataHelper.initParallelChartData(baseDataD,focus);
    }
    static updateParallelChartFocus(baseDataD,focus){
        return ParallelChartDataHelper.updateParallelChartFocus(baseDataD,focus);
    }

    static initRankingChartData(baseData,focus){
        return RankingChartDataHelper.initRankingChartData(baseData,focus);
    }
    static updateRankingChartFocus(baseData,focus){
        return RankingChartDataHelper.updateRankingChartFocus(baseData,focus);
    }

    static initMapBoxViewData(baseData,focus){
        return MapBoxViewDataHelper.initMapBoxViewData(baseData,focus);
    }
    static updateMapBoxViewFocus(baseData,focus){
        return MapBoxViewDataHelper.updateMapBoxViewFocus(baseData,focus);
    }

}