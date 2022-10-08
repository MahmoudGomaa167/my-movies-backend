const multer = require('multer')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'profileImages')
    },
    filename: function (req, file, cb) {
      cb(null, crypto.randomBytes(15).toString('hex') + '_' + file.originalname)
    }
  })

  function fileFilter (req, file, cb) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb('sorry invalid image file', false)
    }
  
  }

  const upload = multer({dest: 'profileImages/', fileFilter,limits: {fileSize: 2000000}, storage}).single('profile_pic')

  module.exports = upload