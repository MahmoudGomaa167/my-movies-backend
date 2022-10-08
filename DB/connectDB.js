const mongoose = require('mongoose')

const runDB = () => {
    return mongoose.connect(process.env.CONNECTION_STRING).then(() => console.log('connected'))
}

module.exports = runDB