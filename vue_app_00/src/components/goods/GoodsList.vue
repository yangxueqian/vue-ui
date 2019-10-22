<template>
    <div class="app-goodlist">
        <div class="goods-item" v-for="item in list" :key="item.lid">
            <img :src="'http://127.0.0.1:3000/'+item.md" alt="">
            <h4>{{item.title}}</h4>
            <div  class="info">
                <span class="now">{{item.price}}</span>
            </div>
            <div class="sell">
                <span>热卖中</span>
            </div>
            <mt-button @click="addCart" :data-lid="item.lid" :data-price="item.price" :data-lname="item.title">加入购物车</mt-button>
        </div>
        <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>>
<script>
export default {
    data(){
        return{
            list:[],
            pno:0,
            pageSize:4
        }
    },
    created(){
        this.getMore();
    },
    methods:{
        //加载更多  加载下一页数据
        getMore(){
            // 1:修改当前页码+1
            this.pno++;
            // 2:发送请求get
            var url = "http://127.0.0.1:3000/products?";
            url+="pno="+this.pno;
            url+="&pageSize="+this.pageSize;
            // 3:获取下一页数据保存 list
            this.axios.get(url).then(result=>{
                var rows = this.list.concat(result.data.data);
                this.list = rows;
            });
        },
        addCart(e){
            var lid = e.target.dataset.lid;
            var n = e.target.dataset.lname;
            var p = e.target.dataset.price;
            console.log(lid+":"+n+":"+p);
            var url = "addcart";
            var obj  = {lid:lid,lname:n,price:p};
            this.axios.get(url,{params:obj}).then(res=>{
                if(res.data.code == -1){
                    this.$toast("请先登录再购买商品");
                }else{
                    this.$toast("添加成功");
                }

            })
        }
    }
}
</script>
<style>
.app-goodlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 4px;
}
.app-goodlist .goods-item{
    width: 49%;
    border:1px solid #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    min-height: 230px;
    justify-content: space-between;
}
.app-goodlist .goods-item img{
    width: 100%;
}
.app-goodlist .goods-item h4{
    font-size: 18px;
}
.app-goodlist .goods-item .now{
    color: red;
    font-size: 16px;
    font-weight: bold;
}
</style>