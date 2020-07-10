const router=require('express').Router();
const Result=require('../utils/result');
router.post('/',(req,res)=>{
    res.send(new Result(10000,"success",{name:"小明"}));
})
module.exports=router;