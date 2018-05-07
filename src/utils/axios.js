import _ from 'lodash'
import axios from 'axios'
import { baseUrl, productUrl } from '../config/env'
import {getStore} from './storage'
import URLSearchParams from 'url-search-params'
import store from '../store/index'

export const url = process.env.NODE_ENV === 'development' ? baseUrl : productUrl

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: '_csrf',
  transformRequest: [function (data, headers) {
    if (_.isEmpty(data)) return data
    // transform obj to formData
    var params = new URLSearchParams()
    Object.entries(data).forEach((item) => params.append.apply(params, item))
    return params
  }],
  validateStatus (status) {
    return status === 200
  }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // before request send, set csrf
  
  // 添加用户Token
  if (!config.headers.authorization) {
    config.headers.authorization = getStore('token')
  }
  document.cookie = `_csrf=${new Date().getTime()}; path=/`
  return config
})

// 返回拦截器
instance.interceptors.response.use(
  ({data, status, statusText}) => {
    if (data) {
      return {data, status, statusText}
    }
    return {
      code: '-1',
      data: ''
    }
  },
  (data) => {
    // 统一错误处理
    return Promise.reject(data)
  })

export default instance
