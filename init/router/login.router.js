const router=require('express').Router();
const Result=require('../utils/result');
const https=require('../utils/https');
const jwt=require('../utils/jwt');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
/*刷新token JWT第三方token*/
router.post('/refreshToken',(req,res)=>{
    let {openid}=req.body;
    let tempToken=jwt.createToken(openid);
    res.send(new Result(10000,"success",{token:tempToken}));
})
//获取access_token，前端需要一次调一次，用完就扔
router.post('/refreshWechatToken',(req,res)=>{
    let {openid}=req.body;
    res.send(new Result(10000,"success",{access_token:global.access_token}));
})
//登录接口
router.post('/',(req,res)=>{
    let {code,encryptedData,iv}=req.body;
    let opts={
        method:'GET',
        url:`https://api.weixin.qq.com/sns/jscode2session?appid=${global.appid}&secret=${global.secret}&js_code=${code}&grant_type=authorization_code`,
        header: {
            'content-type': 'application/json'
        }
    };
    https.get(opts).then(result=>{
        let {openid,session_key}=JSON.parse(result);
        if(!session_key)
        {
            res.send(new Result(59004,'该账号正在使用中',{}));
            return;
        }
        let pc = new WXBizDataCrypt(appid, session_key);
        let decrydata = pc.decryptData(encryptedData, iv);
        let tempToken=jwt.createToken(openid);
        let data={openid:openid,phone:decrydata.phoneNumber,token:tempToken};
        res.send(new Result(10000,"success",data));
    }).catch(err=>{
        console.log(err);
        res.send(new Result(59002,'服务器错误',{}))
    })
})
module.exports = router