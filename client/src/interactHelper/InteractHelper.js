import DataProxy from '../data_helper/DataProxy'

export default class interactorRcvr{
    static updataInformation(chartsData,focus) {
        chartsData.informationData.focus = focus;
        chartsData.informationData.data = DataProxy.updateInformationFocus(chartsData.baseData,focus )
    }
    static updataPieChart(chartsData,focus) {
        chartsData.piechartData.focus = focus;
        chartsData.piechartData.data = DataProxy.updatePieChartFocus(chartsData.baseData,focus )
    }
    static updataParallelChart(chartsData,focus) {
        chartsData.parallelchartData.focus = focus;
        chartsData.parallelchartData.data = DataProxy.updateParallelChartFocus(chartsData.baseDataD,focus)
    }
    static updataRankingChart(chartsData,focus) {
        chartsData.rankingchartData.focus = focus;
        chartsData.rankingchartData.data = DataProxy.updateRankingChartFocus(chartsData.baseData,focus )
    }
}