const express = require("express");
const session = require('express-session');
const cors = require('cors');
const { Msg, getObjByToken } = require("./until/until");
const app = express();

//配置post请求处理中间件
app.use(express.urlencoded({ extended: true }));
//配置项目的JSON交互数据格式
app.use(express.json());

//配置跨域信息的处理
app.use(cors({
    origin: true,
    methods: ["POST", "GET", "DELETE", "PATCH"],//支持跨域的请求方式
    credentials: true//强调所有请求使用同一session
}));

//配置session中间件
app.use(session({
    secret: "usersesion",
    resave: true,
    saveUninitialized: true
}));


//绑定子路由
app.use("/", require("./routers/mainRouter"));
app.use("/user", require("./routers/userRouter"));//用户功能模块

// 拦截器
app.use((req, res, next) => {
   
    let { token } = req.body;
    if (!token) {
        res.send(Msg(201, "请登录"));
    } else {
        try {
            getObjByToken(token);
            next();
        } catch (err) {
            if (err.message.includes("jwt expired")) {
                res.send(Msg(201, "token已过期"));
            }
        }
    }
});

app.use("/good", require("./routers/goodRouter"));


// 匹配所有路由,路由输入不合法时提示
app.all("/*", (req, res) => {
    res.send(Msg(201, `地址出错`));
})
// 错误中间件,自动识别错误并提示,服务器代码需要抛出或者catch抓捕后next()移交控制权到app
app.use((err, req, res,next) => {
    res.send(Msg(201, `服务器出错了${err.message}`));
});
app.listen(1234, () => {
    console.log("后端服务器已启动，端口号1234");
})