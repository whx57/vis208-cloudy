import axios from 'axios';

export default class ServerDataProvider {
    static getData_test(){
        return axios.get('http://localhost:3001/data')
    }
}