const db = require('../utils/mongodb.util')

const PositionSchema=db.Schema({
   city:{type:String,require:true}, 
   companyLogo:{type:String,require:true}, 
   companyName:{type:String,require:true}, 
   degree:{type:String,require:true}, 
   description:{type:String,require:true}, 
   experience:{type:String,require:true}, 
   positionName:{type:String,require:true}, 
   salary:{type:String,require:true}, 
   type:{type:String,require:true},
   createTime:{type:String,require:true}
})

const Position =db.model('Positions',PositionSchema)

const save =(data)=>{
    //将要入库的数据传入model对象
    let position = new Position(data)
    //position.save存储数据库，返回一个promise
    return position.save()
    .then((result)=>{
        return result
    })
    .catch((err)=>{
       return false
    })
}

const find = () => {
    return Position.find({})
      .then(result => result)
}

const findById = (id)=>{
  return Position.findById(id).then(result=>result)
}
const update =(data)=>{
    return Position.findByIdAndUpdate(data.id, data)
    .then(result => result)
    .catch(err => err.msg)
}
const remove = (id)=>{
    return Position.findByIdAndRemove(id)
    .then(result => result)
    .catch(err => err.msg)
}
const findByKeywords = (keywords) => {
    return Position.find({
      $or: [
        {
          positionName: new RegExp(keywords, 'gi')
        }, 
        {
          companyName: new RegExp(keywords, 'gi')
        }
      ]
    })
      .then(result => result)
      .catch(err => err.msg)
  }
module.exports={
    save,
    find,
    findById,
    update,
    remove,
    findByKeywords

}