const userModel = require('../models/user')
const toolsUtil = require('../utils/tools.util')
const fs=require('fs')
const path=require('path')
const jwt=require('jsonwebtoken')



const isSignin = (req,res,next)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf8')
    let username=req.username
    res.render('api.succ.ejs',{
        data:JSON.stringify({username})
    })
}

const signup = async(req,res,next)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf8')
    let {username,password} = req.body
    let result = await userModel.findUser({username})
    if(result){
        res.render('api.fail.ejs',{
            data:JSON.stringify('用户名已存在！')
        })
    }else{
        req.body.password = await toolsUtil.crypt(password)
    let result = await userModel.save(req.body)
    result 
    ? res.render('api.succ.ejs',{data:JSON.stringify('注册成功')})
    : res.render('api.fail.ejs',{data:JSON.stringify('注册失败')})
    }
    
}

const signin=async(req,res,next)=>{
    res.setHeader('Content-Type', 'application/json; charset=utf8')
    let {username,password} = req.body
    let result = await userModel.findUser({username})
    if(result){
       let comparReult =  await toolsUtil.compare({
            hash_password:result.password,
            password
        })
        if(comparReult){
            let username = result.username
            let token = genToken({username})
            res.render('api.succ.ejs',{
                data:JSON.stringify({
                username,
                token
               })
            })
            
        }else{
            res.render('api.fail.ejs',{
                data:JSON.stringify('密码错误!')
            })
            
        }
    }else{
        res.render('api.fail.ejs',{
            data:JSON.stringify('用户名输入错误!')
        }) 
    }
}


function genToken(payload){
    //对称加密，非对称加密
    //非对称加密，根据私钥加密，根据公钥解密

    //生成私钥
    //ssh-keygen -t rsa -b 2048 -f private.key
    //生成公钥
    //openssl rsa -in private.key -pubout -outform PEM public.key
    let cert = fs.readFileSync(path.resolve(__dirname,'../keys/rsa_private_key.pem'));
    const token =jwt.sign(payload,cert,{
        algorithm:'RS256',
        expiresIn:'24h'
    })
    return token

} 
module.exports={
    signup,
    signin,
    isSignin
}