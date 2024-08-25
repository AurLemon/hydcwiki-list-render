import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import 'material-icons/iconfont/filled.css'
import VueTippy from 'vue-tippy'
import 'tippy.js/themes/light.css'

if (process.env.NODE_ENV === 'development') {
    require('@/test/styles.css');
}

Vue.use(VueTippy, {
    directive: 'tippy',
    theme: 'light-modern'
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
