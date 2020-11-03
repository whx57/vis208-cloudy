import axios from 'axios';

export default class ServerDataProvider {
    static getCity_month(){
        return axios.get('http://localhost:3001/city_month')
    }
    static getCity_day(){
        return axios.get('http://localhost:3001/city_day')
    }
}