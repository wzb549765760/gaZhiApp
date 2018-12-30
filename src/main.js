// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
Vue.config.productionTip = false
import global_ from './components/Global'
import echarts from 'echarts'

import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
Vue.use(layer)
import QRCode from 'qrcode'
Vue.use(QRCode)


Vue.prototype.GLOBAL = global_;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})