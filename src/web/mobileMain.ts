import Vue from 'vue'
import App from './Mobile.vue'
import router from './mobileRouter'
import axios from '@/libs/axios'
import { AxiosError } from 'axios'
import install from './install.js'
// import store from './store'

Vue.use(install)
Vue.config.productionTip = false

Vue.config.errorHandler = (err: AxiosError, vm, info) => {
  console.log('Vue.config.errorHandler')
  console.dir(err)
  if (err.response) {
    alert(err.response.data.message || err.response.data)
    return
  }
  if (err.message) {
    alert(err.message)
  }
}

Vue.use(axios)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
