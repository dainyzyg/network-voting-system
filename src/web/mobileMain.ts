import Vue from 'vue'
import App from './Mobile.vue'
import router from './mobileRouter'
import axios from '@/libs/axios'
import { AxiosError } from 'axios'
// import store from './store'

Vue.config.productionTip = false

Vue.config.errorHandler = (err: AxiosError, vm, info) => {
  console.log(err.response)
  if (err.response) {
    alert(err.response.data.message)
  }
}

Vue.use(axios)
new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
