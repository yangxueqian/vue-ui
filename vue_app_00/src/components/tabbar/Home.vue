<template>
    <div class="app-home">
    <!-- 顶部导航条 -->
        
    <!-- 轮播图 -->
        <mt-swipe>
            <mt-swipe-item v-for="item in list" :key="item.id">
                <img :src="item.img_url"/>
            </mt-swipe-item>
        </mt-swipe>
    <!-- 九宫格 -->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="gonewslist"><a href="#">
		                    <img src="../../img/menu1.png"/>
		                    <div class="mui-media-body">新闻资讯</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="gogoodslist"><a href="#">
		                    <img src="../../img/menu2.png"/>
		                    <div class="mui-media-body">商品</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                        <a href="#/cart">
		                    <img src="../../img/menu3.png"/>
		                    <div class="mui-media-body">购物车</div>
                        </a>
                    </li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu4.png"/>
		                    <div class="mui-media-body">支付</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu5.png"/>
		                    <div class="mui-media-body">搜索</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu6.png"/>
		                    <div class="mui-media-body">更多</div></a></li>
		        </ul> 
		</div>

    <!-- tabbar -->
        
    </div>
</template>
<script>
    export default{
        data(){
            return{
               list:[]
            }
        },
       methods:{
            handleImage(){
                //1:发送ajax请求给 服务器
                var url = "http://127.0.0.1:3000/imageList";
                this.axios.get(url).then
                (result=>{
                    console.log(result);
                    this.list=result.data;
                });
                //2:接收服务器返回结果
                //3:将结果保存到list
            },
            gogoodslist(){
                this.$router.push("/GoodsList")
            },
            gonewslist(){
                this.$router.push("/NewsList")
            }  
        },
        created(){
            this.handleImage();
        },
    }
    
</script>
<style>
    /*轮播图*/
    .app-home .mint-swipe{
        height:200px;
    }
    .app-home .mint-swipe img{
        width:100%;
    }
    /*九宫格*/
    .app-home .mui-row li{
        list-style:none;
    }
    .app-home .mui-content ul img{
        width:60px;
        height:60px;
    }
    .app-home .mui-content ul{
        background-color:#fff;
    }
    /*tabbar*/
    
</style>