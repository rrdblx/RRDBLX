const posModel = require('../models/position')
const moment = require('moment')

const save = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  req.body.createTime = moment().format('YYYY-MM-DD h:mm')
  req.body.companyLogo = req.filename
  const result = await posModel.save(req.body)
  if (result) {
    res.render('api.succ.ejs', {
      data: JSON.stringify({
        message: 'succ'
      })
    })
  } else {
    res.render('api.fail.ejs', {
      data: JSON.stringify({
        message: 'fail'
      })
    })
  }
}

const find = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  const result = await posModel.find()
  res.render('api.succ.ejs', {
    data: JSON.stringify(result)
  })
}

const findById = async(req,res,next)=>{
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  const result = await posModel.findById(req.params.id)
    res.render('api.succ.ejs', {
      data:JSON.stringify(result)
    })
}

const update = async(req,res,next)=>{
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  req.body.createTime = moment().format('YYYY-MM-DD h:mm')
  const result = await posModel.update(req.body)
  if(result){
    res.render('api.succ.ejs',{data:JSON.stringify({msg:'succ'})})
  }else{
    res.render('api.fail.ejs',{data:JSON.stringify({msg:'fail'})})
  }
}
const remove = async(req,res,next)=>{
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  const result = await posModel.remove(req.body.id)
  if(result){
    res.render('api.succ.ejs',{data:JSON.stringify({msg:'succ'})})
  }else{
    res.render('api.fail.ejs',{data:JSON.stringify({msg:'fail'})})
  }
}
const findByKeywords = async (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
   console.log(req.query.keywords)
  const result = await posModel.findByKeywords(req.body.keywords)
  if (result) {
    res.render('api.succ.ejs', {data: JSON.stringify(result)})
  } else {
    res.render('api.fail.ejs', {data: JSON.stringify({msg: 'fail'})})
  }
}
module.exports = {
  save,
  find,
  findById,
  update,
  remove,
  findByKeywords
}