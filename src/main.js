import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask'
import Notifications from 'vue-notification'

Vue.use(VueMask)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
