const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'profileImages')
//   },
//   filename: function (req, file, cb) {
//     cb(null, crypto.randomBytes(15).toString('hex') + '_' + file.originalname)
//   }
// })

const storage = multer.diskStorage({})

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb('sorry invalid image file', false)
  }

}

const upload = multer({ fileFilter, limits: { fileSize: 2000000 }, storage }).single('profile_pic')


// Cloudinary Config
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDIANRY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET

})

module.exports = {upload, cloudinary}


