const multer = require('multer')
const crypto = require('crypto')
const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv')
dotenv.config()

let bucket;
mongoose.connection.on('connected', () => {
  const db = mongoose.connection.db
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "profileImages"
  })
})


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'profileImages')
//   },
//   filename: function (req, file, cb) {
//     cb(null, crypto.randomBytes(15).toString('hex') + '_' + file.originalname)
//   }
// })

const storage = new GridFsStorage({
  url: process.env.CONNECTION_STRING,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = crypto.randomBytes(15).toString('hex') + '_' + file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "profileImages"
      };
      resolve(fileInfo);
    });
  }
})

function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true)
  } else {
    cb('sorry invalid image file', false)
  }

}

const upload = multer({ fileFilter, limits: { fileSize: 2000000 }, storage }).single('profile_pic')

module.exports = {upload, bucket}