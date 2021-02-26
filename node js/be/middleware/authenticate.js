const path =require('path')
const jwt = require('jsonwebtoken')
const fs =require('fs')

module.exports = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf8')
    //获得前端提交的token
    let token =req.header('X-Access-Token')
    let cert =fs.readFileSync(path.resolve(__dirname,'../keys/rsa_public_key.pem'))
    jwt.verify(token,cert,function(err,decoded){
        if(err){
            res.render('api.fail.ejs',{
                data:JSON.stringify('用户认证失败！')
            })
        }else{
            req.username = decoded.username
            next()
        }
    })
}