import axios, { AxiosRequestConfig } from 'axios'

export default {
  install(Vue, options = {}) {
    let axiosOptions: AxiosRequestConfig = {
      // baseURL: 'http://10.22.25.242:8003/',
      // baseURL: 'http://172.20.10.3/',
      // baseURL:'http://192.168.43.174:80/',
      ...options
    }

    if (process.env.NODE_ENV === 'development') {
      axiosOptions.baseURL = 'http://10.22.25.242:8003/'
    }

    const instance = axios.create(axiosOptions)
    Vue.prototype.$axios = instance
  }
}
