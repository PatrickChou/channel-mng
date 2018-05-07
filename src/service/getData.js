import axios from '../utils/axios'
import { getStore } from '../config/mUtils'

/**
 * 账号密码登录
 */
export const accountLogin = (data) => axios.post('http://10.166.10.200:17001/channel-mng/bdDataDictService/getAllDefaultJsonData', data);

export const loadData = (data) => axios.get('/api/news');