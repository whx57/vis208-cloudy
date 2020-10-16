import ServerDataProvider from './ServerDataProvider'

export default class DataProxy {
    static async initChartsData (chartsData){
        ServerDataProvider.getData_test().then(
            (response) => {
                chartsData.baseData = response.data;
            }
        )
    }
}