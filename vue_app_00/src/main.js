import Vue from 'vue'
import App from './App.vue'
import router from './router'

import  MintUI from  "mint-ui"
Vue.use(MintUI)
import'mint-ui/lib/style.css'   //1：引入mint-ui样式文件
// Vue.config.productionTip = false;//暂时不知这句代码的功能

import './lib/mui/css/mui.css'  //2：引入mui库样式文件
import './lib/mui/css/icons-extra.css'  // 导入 MUI 的样式表，扩展图标样式，购物车图标 //还需要加载图标字体文件

// import{Header,Swipe,SwipeItem,Button} from  "mint-ui"//引入 mint-ui 组件 Header
// Vue.component("mt-header",Header);//注册Header组件 (Header.name的值为：mt-header)
// Vue.component("mt-swipe",Swipe);
// Vue.component("mt-swipe-item",SwipeItem);
// Vue.component(Button.name,Button);

//5:引入 axios  库
import axios from  "axios"
axios.defaults.baseURL="http://127.0.0.1:3000/"
//6:配置跨域访问保存 session
axios.defaults.withCredentials=true;
//7:将axios库配置vue
Vue.prototype.axios = axios;


//8:创建日期过滤器
Vue.filter("datetimeFilter",function(val){
  //8.1:创建日期对象
  var date = new Date(val);
  //8.2:获取 年月日，时分秒 
  var y = date.getFullYear();
  var m = date.getMonth()+1;
  var d = date.getDate();
  var h = date.getHours();
  var mi = date.getMinutes();
  var s = date.getSeconds();
  //8.3:返回字符串 y-m-d h:mi:s
  m<10&&(m="0"+m);
  d<10&&(d="0"+d);
  return `${y}-${m}-${d} ${h}:${mi}:${s}`;
});


import Vuex from "vuex"
Vue.use(Vuex);
var store = new Vuex.Store({
  state:{cartCount:0},
  mutations:{
    //购物车商品数量减1
    subItem(state){state.cartCount--}, 
    //购物车商品数量加1
    addItem(state){state.cartCount++},
    //清空购物车量   
    clearItem(state){state.cartCount=0}
  },
  getters:{
    //获取购物车数量
    getCartCount(state){ return state.cartCount}
  },
  actions:{
    // 修改数据函数保存mutations clearItem
    // 异步执行操作
    // context 上下文对象=>$store对象
    modifyCount:(context)=>{
      //异步等待500毫秒调用clear函数
      setTimeout(()=>{
        context.commit("clearItem")
      },500)
   }
  }
});

// //12:将实例对象添加Vue中
// new Vue({
//   router,
//   render: h => h(App),  //App App.vue根组件
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')