// import Vue from 'vue';
// import Vuex from 'vuex';

// 安装Vuex
Vue.use(Vuex);

// 导入封装的vuex- user模块
import {User} from './modules/user'
// 导入封装的vuex- menuList模块
import { Menu } from "./modules/menu"
// 导入封装的vuex- tag标签导航模块
import {tagView} from './modules/tagView.js'

// 导入获取值的模块
import {getters} from './getters'



// 1.创建vuex实例对象
const store = new Vuex.Store({
  // 模块存放
  modules: {
      User,
      Menu,
      tagView
  },
  getters
})

export default store;
