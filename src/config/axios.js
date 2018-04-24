import axios from 'axios'

// var Axios = new axios({
//     url: ''
// })
import { baseUrl } from './env'

const instance = axios.create({
    baseURL: baseUrl,
    //headers: {'X-Custom-Header': 'foobar'}
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});


export const axiosPost = (url, data) => {
    return instance.post(url, data)
}
export const axiosGet = (url) => {
    return instance.get(url)
}
