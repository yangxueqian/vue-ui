//1:加载模块 
const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const pool = require("./pool");
//5:加载跨域访问模块
const cors = require("cors");
//2:创建服务器端对象
var app =express();
//3:监听端口3000
app.listen(3000);
//4：托管静态资源到public目录下
app.use(express.static('public'));
//6:配置跨域访问模块 
//origin        允许访问的域名
//credentials   跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080","http://localhost:8080"],
  credentials:true
}));
//配置 session 模块
app.use(session({
  secret:"128位字符串",
  resave:"true",
  saveUninitialized:true
}));
//功能一：home组件轮播图片
app.get("/imageList",(req,res)=>{
  //1:将轮播图中所需图片 复制public/img
  //2:查询
  var list = [
    {
      id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"
    },
    {
      id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"
    },
    {
      id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"
    },
    {
      id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"
    },
  ];
  res.send(list);
});
//功能二：获取 新闻列表分页显示
//xz_news表 20 条数据 7行一页  三页
//1:请求参数  pno 页码  pageSize 页大小
//2:哪条sql
//SELECT IDBCursor,title,img_url,ctime,point FROM xz_news LIMIT ?,?
//3:返回数据结果json {code:1,dat[]}
app.get("/newslist",(req,res)=>{
  //1:获取参数 pno pageSize
  var pno  = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值 pno 1 pgeSize 7
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=7;
  }
  //3:创建sql语句 
  var sql = "  SELECT id,title,img_url,ctime,point,content FROM xz_news LIMIT ?,?";
  // var sql = "  SELECT id";
  // sql +=" ,ctime,point";
  // sql +=" FROM xz_news";
  // sql +=" LIMIT ?,?";
  var offset = (pno-1)*pageSize;
  var ps = parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
 //4:返回 
})
// 功能三：商品的分页显示
app.get("/products",(req,res)=>{
  // 1:参数 pno pageSize
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  // 2:允许使用默认值 1 7
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  // 3：sql
  var sql = " SELECT l.lid,l.title,l.price,p.md";//三板斧:3：需要查询的列写在SELECT后
  sql+=" FROM xz_laptop l,xz_laptop_pic p";//三板斧1：从哪几张表中进行多表查询，将他们的表名放在FROM后，并且为每张表创建别名（在本来的表名后空格，然后写出别名）
  sql+=" WHERE l.lid = p.laptop_id";//三板斧2：找出几张表中有联系（等于，大于等于，小于等于）的列，并将此作为条件放在WHERE后面
  sql+=" GROUP BY l.lid";//筛选
  sql+=" LIMIT ?,?";//分页
  // 4:json
  // http://127.0.0.1:3000/products
  var offset = (pno-1)*pageSize;
  var ps = parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err)throw err;
    res.send({code:1,data:result});
  })
})
// 功能四：登录
app.get("/login",(req,res)=>{
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  var sql = "SELECT id FROM xz_login";
  sql +=" WHERE uname = ? AND upwd = md5(?)";
   pool.query(sql,[uname,upwd],(err,result)=>{
   if(err)throw err;
   // 判断用户登录成功
   if(result.length==0){
   res.send({code:-1,msg:"用户名或密码有误"});
   }else{
   //登录成功
     // 1:将登录成功凭据保存session
     //如果登录成功，result=[{id:1}],取出result数组中登录成功的id序号作为登录成功的凭据保存到session中
     req.session.uid = result[0].id;
     console.log(req.session);
     //2.将成功消息发送脚手架
   res.send({code:1,msg:"登录成功"})
   }
 })
});
//购物车功能
app.get("/addcart",(req,res)=>{
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请先登录"});
    return;
  }
  var lid = req.query.lid;
  var price = req.query.price;
  var lname  = req.query.lname;
  var sql = "SELECT id FROM xz_cart WHERE uid = ? AND lid = ?";
  pool.query(sql,[uid,lid],(err,result)=>{
    if(err)throw  err;
    var sql= "";
    if(result.length==0){
      sql=`INSERT INTO xz_cart VALUES(null,${lid},${uid},1,'${lname}',${price},'01.jpg')`;
    }else{
      sql=`UPDATE xz_cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      res.send({code:1,msg:"添加成功"})
    })
  })
})

//购物车减一
app.get("/cartjianyi",(req,res)=>{
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请先登录"});
    return;
  }
  var lid = req.query.lid;
  sql=`UPDATE xz_cart SET count=count-1 WHERE uid=${uid} AND lid=${lid} AND count>1`;
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"成功删除一件商品！"});
    }else{
    res.send({code:-1,msg:"删除失败！"});
    }
  })  
})

//查询当前登录用户购物车信息
app.get("/cart",(req,res)=>{
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  var sql = "SELECT  id,lid,lname,price,count,img_url FROM xz_cart WHERE uid = ?";
  pool.query(sql,[uid],(err,result)=>{
    if(err)throw err;
    res.send({code:1,msg:"查询成功",data:result});
  })
})
//删除购物车中的一个商品
app.get("/del",(req,res)=>{
  // (1)获取参数id
  var id = req.query.id;
  // (2)创建sql语句
  var sql = "DELETE FROM xz_cart WHERE id = ?";
  // (3)json 
  pool.query(sql,[id],(err,result)=>{
    if(err)throw err;
    // (4)判断条件(sql语句执行成功的影响行数)
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
    res.send({code:-1,msg:"删除失败"});
    }
  })
})
//删除购物车中的多个商品
app.get("/delM",(req,res)=>{
  var ids = req.query.ids;
  var sql =`DELETE FROM xz_cart WHERE id IN (${ids})`;
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"});
    }else{
    res.send({code:-1,msg:"删除失败"});
    }
  })
})