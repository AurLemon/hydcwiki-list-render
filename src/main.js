import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import 'material-icons/iconfont/filled.css'

if (process.env.NODE_ENV === 'development') {
    require('@/test/styles.css');
}

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
