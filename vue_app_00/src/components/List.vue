<template>
    <div class="app-list">
        <h3>数据列表</h3>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.id}}:{{item.name}}:{{item.age}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                list:[
                    {id:1,name:"tom",age:19},
                    {id:2,name:"jerry",age:20},
                    {id:3,name:"james",age:21}
                ]
            }
        }
    }
</script>
<style>
</style>