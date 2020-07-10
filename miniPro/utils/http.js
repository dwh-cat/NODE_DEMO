Boolean.prototype.isFreshing=false;//判断当前token是否刷新
Array.prototype.tasks=[];//用于装纳多个请求任务
const req=(url,data,callback="")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      data:data,
      method:'POST',
      header:{
        'token':getToken(),
        'Content-Type': 'application/json'
      },
      method:'POST',
      success:(res)=>{
        if(callback&&res.data.code==10000)
        {
          callback(res.data.data)
          return;
        }
        if(res.data.code==10000)
        {
          resolve(res.data.data)
          return;
        }
        
        if(res.data.code==59001){
          Array.prototype.tasks.push({url:url,data:data,callback:resolve})
          if(!Boolean.prototype.isFreshing)
          {
            Boolean.prototype.isFreshing=true;
            getNewToken().then(()=>{
              Array.prototype.tasks.forEach((task)=>{
                req(task.url,task.data,task.callback)
              })
            }).catch(err=>{
              throw new Error(err);
            }).finally(()=>{
              Boolean.prototype.isFreshing=false;
              Array.prototype.tasks=[];
            })
          }
          
        }
        else{
          throw new Error(res.data.message)
        }
      }
    })
  })
}
const getNewToken=()=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: 'http://localhost:3000/login/refreshToken',
      data:{
        openid:getOpenid()
      },
      method:'POST',
      header:{
        'Content-Type': 'application/json'
      },
      success:(res)=>{
        if(res.data.code==10000)
        {
          wx.setStorageSync('token', res.data.data.token);
          resolve();
        }
        else
        {
          reject();
        }
      }
    })
  })
}
const getToken=()=>{
  let token = wx.getStorageSync('token') || '';
  return token;
}
const getOpenid=()=>{
  let openid = wx.getStorageSync('openid') || '';
  return openid;
}
module.exports={req:req}