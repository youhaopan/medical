import Vue from 'vue'
import App from './App'
import router from './routers';
import store from './store';
import iView from 'iview';
import ECharts from 'vue-echarts'
import $ from 'jquery';
import  './css/iview.less';
Vue.config.productionTip = false
Vue.use(iView);
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
