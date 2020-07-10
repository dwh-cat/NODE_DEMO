let jwt=require('jsonwebtoken');
const privateSec='daiweihong123456789';
function createToken(openid){
    //redis处理openid为键，token为值，k-v存储
    return jwt.sign({openid:openid},privateSec);
}
function checkToken(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,privateSec,(err,res)=>{
            if(!err) {
                resolve(res)
            }else{
                reject();
            }
        })
    })
}
module.exports = {
    createToken,checkToken
}