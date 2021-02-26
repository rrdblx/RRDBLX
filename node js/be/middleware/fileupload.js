const multer = require('multer')
const path = require('path')

const fileupload = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf8')
  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      console.log(0)
      cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: function(req, file, cb) {
      console.log(0)
      let fn = file.originalname
      let dot = fn.lastIndexOf('.')
      let filename = file.fieldname + '-' + Date.now() + fn.substr(dot)
      req.filename = filename
      cb(null, filename)
    }
  })
  const upload = multer({storage}).single('companyLogo')
  upload(req,res,function(err){
    if(err){
      res.render('pos.fail.ejs',{
        data:JSON.stringify({
          msg:'fail'
        })
      })
  
    }else{
      next()

      
    }
  })
  
}
module.exports = {
    fileupload
}