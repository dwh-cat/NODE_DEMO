const router=require('express').Router();
const Result=require('../utils/result');
const jwt=require('../utils/jwt');
function valideToken(req,res,next){
    console.log("请求来了",req.url);
    if(req.url=='/login'||req.url=='/login/refreshToken')
    {
        next();
    }
    else{
        let {token}=req.headers;
        jwt.checkToken(token).then((res)=>{
            next();
        }).catch((err)=>{
            res.send(new Result(59001,'token已过期',null));
        })
    }
    
    
}
router.use(valideToken);
module.exports=router;