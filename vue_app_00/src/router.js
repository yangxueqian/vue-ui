import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Home from "./components/tabbar/Home.vue"
import Exam01 from "./components/Exam01.vue"
import List from "./components/List.vue"
import NewsList from "./components/home/NewsList.vue"
import GoodsList from "./components/goods/GoodsList.vue"
import Login from "./components/xz/Login.vue"
import Cart from "./components/xz/Cart.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',redirect:'/Home'},   //默认自动跳转
    {path:'/Exam01',component:Exam01},
    {path:'/List',component:List},
    {path:'/Home',component:Home},
    {path:'/NewsList',component:NewsList},
    {path:'/GoodsList',component:GoodsList},
    {path:'/Login',component:Login},
    {path:'/Cart',component:Cart}
  ]
})
