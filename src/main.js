// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base.css'
import breadCrumb from '@/components/breadcrumb'
// 加载自定义插件
import httpRequest from '@/assets/http.js'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.use(ElementUI)
    // 使用自定义vue插件
Vue.use(httpRequest)

Vue.component(breadCrumb.name, breadCrumb);

Vue.filter('fmtdate', (v) => {
    return moment(v).format('YYYY-MM-DD')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})