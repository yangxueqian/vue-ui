<template>
    <div class="app-login">
        <mt-field :placeholder="unameholder" v-model="uname"></mt-field>
        <mt-field :placeholder="upwdholder" v-model="upwd" type="password"></mt-field>
        <mt-button size="large" @click="login">登录</mt-button>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                unameholder:"请输入用户名",
                upwdholder:"请输入密码",
                uname:"",
                upwd:""
            }
        },
        methods:{
            login(){
                var u = this.uname;
                var p = this.upwd;
                // console.log(u+"_"+p);
                var reg = /^[a-z0-9]{3,12}$/i;
                if(!reg.test(u)){
                    this.$toast("用户名格式不正确");
                    return;//用户名验证失败不再向后执行
                }
                if(!reg.test(p)){
                    this.$toast("密码格式不正确");
                    return;//密码验证失败不再向后执行
                }
                //发送ajax请求axios
                var url = "login";
                var obj = {uname:u,upwd:p}
                this.axios.get(url,{params:obj}).then(res=>
                {
                    //console.log(res);
                    if(res.data.code==-1){
                        this.$toast("用户名和密码有误");
                    }else{
                        this.$router.push("/GoodsList")
                    }
                })

            }
        }
    }
</script>
<style>
    
</style>