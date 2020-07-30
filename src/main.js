import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import messagePlugin from './utils/message.plugin'

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(messagePlugin)

Vue.config.productionTip = false
Vue.prototype.$appName = 'TGSearch'
Vue.prototype.$botName = '@bot_name_tg'

Vue.store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
