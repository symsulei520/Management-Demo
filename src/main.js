import App from './App.vue'

// import Vue from 'vue'

import router from './router'

// vuex
import store from './store'

// element-ui
// import 'element-ui/lib/theme-chalk/index.css'
// import './plugins/element.js' // 按需引入element-ui组件



// mockjs获取数据接口文件全局引入
import Mock from './mock/mock.js';
Mock.bootstrap();

// 统一登录认证
import './permission'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
