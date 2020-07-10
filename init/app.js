const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const https=require('../init/utils/https');
const app = express();
const indexRouter=require('./router/index.router');
const loginRouter = require('./router/login.router');
const testRouter=require('./router/test.router');
global.appid='wxd99a5be4a1edde82';
global.secret='c65db06d8be28a5a9c616392921fe2a7';
global.access_token='';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//路由注册
app.use(indexRouter);
app.use('/login', loginRouter);
app.use('/test',testRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
//定时获取access_token
getWechatToken();
setInterval(()=>{
  getWechatToken();
},60*60*1000);
//获取微信access_token
function getWechatToken(){
  let opts = {
      method: 'GET',
      url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${global.appid}&secret=${global.secret}`,
      header: {
          'content-type': 'application/json'
      }
      };
  https.get(opts).then(result=>{
      global.access_token=JSON.parse(result).access_token;
  })
}
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
