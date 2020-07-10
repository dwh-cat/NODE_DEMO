// pages/a_test/login.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    phone:null,
    modalState:false,
    code:null
  },
  gpn(e){
    const that=this;
    let opts={
      code:that.data.code,
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
  }
    app.utils.req('http://localhost:3000/login',opts).then(res=>{
      that.setData({
        openid:res.openid,
        phone:res.phone
      })
      wx.setStorageSync('token', res.token)
      wx.setStorageSync('openid', res.openid)
    }) 
  },
  refreshwechatToken(){
    const that=this;
    let opts={
      openid:that.data.openid
    }
    app.utils.req('http://localhost:3000/login/refreshWechatToken',opts).then(res=>{
      console.log(res)
    })
  },
  normalRequest(){
    const that=this;
    let opts={
      openid:that.data.openid
    }
    app.utils.req('http://localhost:3000/test',opts).then(res=>{
      console.log(res)
    })
    app.utils.req('http://localhost:3000/test',opts).then(res=>{
      console.log(res)
    })
    app.utils.req('http://localhost:3000/test',opts).then(res=>{
      console.log(res)
    })
    app.utils.req('http://localhost:3000/test',opts).then(res=>{
      console.log(res)
    })
  },
  animateShow(){
    this.setData({
      modalState:true
    })
  },
  animateHide(){
    this.setData({
      modalState:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    wx.login({
      success:(res)=>{
        that.setData({
          code:res.code
        })
      }
    })
  }
})