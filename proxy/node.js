var express = require('express');
var path = require('path');
var app = express();
var port = 3001;

// 通配符拦截所有路由请求，作逻辑判断
app.use('*', function (req, res, next) {
    console.log(req);
    next();
    /*if(req.xxx){
        // 逻辑代码
        next() // 放行
    }else{
        // 逻辑代码
    }*/
});
console.log('Node is running at http://127.0.0.1:3001/');
app.listen(port);
