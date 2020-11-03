import axios from 'axios';

export default class DataProvider {
    /*static getData_test(){
        return axios.get('http://localhost:3001/data')
    }*/
    static getRegionJson(){
        return axios.get('http://localhost:3001/regions')
    }
    static getCityPointJson(){
        return axios.get('http://localhost:3001/citypoint')
    }
}