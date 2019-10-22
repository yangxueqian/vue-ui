<template>
    <div class="cart">
        
        <!-- 购物车商品信息 -->
        <div class="cart_item" v-for="(item,i) of list" :key="i">
            <div class="leftImgText">
                <input type="checkbox" v-model="item.cb">
                <img :src="'http://127.0.0.1:3000/'+item.img_url" alt="">
            </div>
            <div>
                <div class="lname">
                    {{item.lname}}
                </div>
                 <div class="count">
                    <div class="count2">
                        <mt-button @click="cartjiayi" :data-lid="item.lid" :data-price="item.price" :data-lname="item.lname">+</mt-button>
                            {{item.count}}
                        <mt-button @click="cartjianyi" :data-lid="item.lid" :data-price="item.price" :data-lname="item.lname">-</mt-button>
                        <div class="price">{{item.price}}</div>
                    </div>
                    <mt-button @click="delItem" :data-id="item.id">删除</mt-button>
                </div>
            </div>
        </div>
        <!-- 商品小计 -->
        <div id="b_2">
            <div>全选<input type="checkbox" @change="selectAll"/></div>
            <div>购物车商品总数<span style="color:red">{{$store.getters.getCartCount}} </span></div>
            <div>小计：<span></span></div>
        </div>
        <div>
            <mt-button @click="delMitem">删除选中商品</mt-button>
            <mt-button>去结算</mt-button>
        </div>
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
            selectAll(e){
                // 1:获取全选按钮状态
                var cb = e.target.checked;
                // console.log(cb);
                // 2：创建循环遍历购物车数组
                for(var item of this.list){
                // 3：将全选状态赋值购物车商品选中状态
                    // item.cb 商品状态=cb全选按钮状态
                    item.cb = cb;
                }
            },
            delMitem(){
                // 1:创建变量保存多个购物车中id值
                var str = "";
                // 2：创建循环遍历数组获取状态为true的id值
                for(var item of this.list){
                    if(item.cb){
                        str += item.id+","
                    }
                }
                 //console.log(str.length);
                if(str.length==0){
                    this.$toast("未选中任何商品！");
                }
                else{
                // 3：截取字符串中最后的逗号
                str = str.substring(0,str.length-1);
                //console.log(str)   1,2,3
                // 4：显示交互提示框，再次请用户确认操作
                this.$messagebox.confirm("是否删除数据 ？")
                .then(res=>{
                    //用户选择确认按钮
                    var url = "delM";
                    var ids = {ids:str};//参数名字ids:值拼接字符串
                    this.axios.get(url,{params:ids}).then(res=>{
                        this.loadMore();//删除多个商品后，加载新的购物车列表
                        this.$toast("删除成功") 
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
                // 5：发送ajax请求删除多个数据
                // 6：提示用户删除成功
                //7:重新加载购物车中数据
                }
            },
            cartjiayi(e){
                var lid = e.target.dataset.lid;
                var n = e.target.dataset.lname;
                var p = e.target.dataset.price;
                console.log(lid+":"+n+":"+p);
                var url = "addcart";
                var obj  = {lid:lid,lname:n,price:p};
                this.axios.get(url,{params:obj}).then(res=>{
                    if(res.data.code == -1){
                        this.$toast("请先登录再添加商品");
                    }else{
                        this.$toast("添加成功");
                        this.loadMore();
                    }
                })
            },
            cartjianyi(e){
                var lid = e.target.dataset.lid;
                var n = e.target.dataset.lname;
                var p = e.target.dataset.price;
                console.log(lid+":"+n+":"+p);
                var url = "cartjianyi";
                var obj  = {lid:lid,lname:n,price:p};
                this.axios.get(url,{params:obj}).then(res=>{
                    if(res.data.code == -1){
                        this.$toast("已是最小数量！");
                    }else{
                        this.$toast("您删除了一件商品！");
                        this.loadMore();
                    }
                })
            },
            loadMore(){
                var url = "cart";
                this.axios.get(url).then(res=>{
                    //console.log(res);
                    //交互：如果用户未登录就想查看购物车，提示请先登录并跳转登录页面
                    if(res.data.code == -1){
                        this.$messagebox("消息","请登录").then(res=>{
                            this.$router.push("/Login");
                            return;
                        });
                    }else{
                        var list = res.data.data;
                        //console.log(list);
                        //为了实现购物车多选删除在此创建循环遍历数组并且为每个元素添加cb属性表示，商品前复选框状态
                        //注意先添加cb属性再赋值list  顺序很重要
                        //刷新购物车商品数量时为防止重复清点，应先清空后再加载 
                        this.$store.commit("clearItem");
                        for(var item of list){
                            item.cb = false;
                            this.$store.commit("addItem")//修改共享购物车中的数值Vuex
                        }
                        this.list=list;
                    }

                })
            },
            delItem(e){
                var id = e.target.dataset.id;
                // console.log(id);
                this.$messagebox.confirm("是否删除指定商品")
                .then(res=>{
                    //同意
                    //发送ajax服务器
                    var url ="del";
                    var  obj = {id:id};
                    this.axios.get(url,{params:obj}).then(res=>{
                        if(res.data.code > 0){
                            this.$toast("删除成功");
                            this.loadMore();
                        }
                    })
                })
                .catch(err=>{console.log("用户取消操作")})
            }
            
        },
        created(){
            this.loadMore();
        }
    }
</script>
<style>
    .cart_item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-top: 25px;
    }
    .cart_item .leftImgText{
        display: flex;
        align-items: center;
    }
    .cart_item .leftImgText img{
        width: 100px;
        height: 100px;
        padding: 10px;
    }
    .cart_item .price{
        color:red;
        margin-left: 25px;
    }
    .cart_item .count,.cart_item .count2{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #b_2{
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
    }
    .cart>div:last-child{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .cart>div:last-child button{
        margin: 8px;
        padding: 5px;
        font-size: 16px;
    }
</style>