const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile_pic: {type: String, default: ""},
    favourites: [{type: mongoose.Types.ObjectId, ref: 'Movie'}],
    age: {type: Number},
    phone: {type: String, default: ""},
    role: {type: String, default: 'user'},
    is_verified: {type: Boolean, default: false},
    code: String,
    gender: {type: String, default: "male"},
    is_blocked: {type: Boolean, default: false}
}, {
    timestamps: true
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS))
    next()
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel