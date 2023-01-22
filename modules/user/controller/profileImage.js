const mongoose = require('mongoose')

const url = process.env.CONNECTION_STRING
const connect = mongoose.createConnection(url)

let gfs;

connect.once("open", () => {
    gfs = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "profileImages"
    })
})


const getProfilemage = async (req, res) => {
    try {
        const { filename } = req.params
        const file = await gfs.find({ filename }).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                res.status(400).json({ message: "Image Not Found" })
            } if(files[0].contentType === 'image/jpg' || files[0].contentType === 'image/jpeg' || files[0].contentType === 'image/png') {
                gfs.openDownloadStreamByName(filename).pipe(res)
            }else{
                res.status(400).json({message: "Not an image"})
            }
        })
    } catch (error) {
        res.status(500).json({ message: "internal server error", error })
    }

}

module.exports = getProfilemage