import axios, { AxiosRequestConfig } from 'axios'

export default {
  install(Vue, options = {}) {
    let axiosOptions: AxiosRequestConfig = {
      // baseURL: 'http://127.0.0.1:80/',
      // baseURL: 'http://192.168.1.101/',
      // baseURL:'http://192.168.43.174:80/',
      ...options
    }
    const instance = axios.create(axiosOptions)
    Vue.prototype.$axios = instance
  }
}
