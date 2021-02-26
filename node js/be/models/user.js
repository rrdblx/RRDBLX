const db = require('../utils/mongodb.util')

const UserSchema = db.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const User = db.model('Users',UserSchema)

const save = (data)=>{
    return new User(data)
    .save()
     then(result => result)
     .catch((err)=>{
         return false
     })
}
const findUser =(option)=>{
  return User.findOne(option)
     .then(result=>result)
     .catch((err)=>{
         return false
     })
}


module.exports = {
    save,
    findUser
}