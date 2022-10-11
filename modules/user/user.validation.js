const joi = require('joi')

const signupValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        userName: joi.string().required().min(3).max(30),
        email: joi.string().required().email(),
        password: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
        cPassword: joi.string().required().valid(joi.ref('password')),
        gender: joi.string().required().pattern(new RegExp(/^(male|female){1}$/))
    })
}

const loginValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        email: joi.string().required().email(),
        password: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/))
    })
}

const forgetPasswordValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        email: joi.string().required().email(),
    })
}

const resetPasswordValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        verificationKey: joi.string().required(),
    })
}

const changePasswordValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        newPassword: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
        cNewPassword: joi.string().required().valid(joi.ref('newPassword'))
    })
}

const getUserValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        userId: joi.string().required().min(24).max(24)
    })
}

const updateUserValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        userName: joi.string().required().min(3).max(30),
        email: joi.string().required().email(),
        gender: joi.string().pattern(new RegExp(/^(male|female){1}$/)),
        phone: joi.string().empty('').default('').pattern(/^01(0|1|2|5){1}[0-9]{8}$/),
        profile_pic: joi.string().empty('').default('')
    })
}

const updatePasswordValidation = {
    body: joi.object().required().options({abortEarly: false}).keys({
        oldPassword: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
        newPassword: joi.string().required().pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
        cNewPassword: joi.string().required().valid(joi.ref('newPassword'))
    })
}

const logoutValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        userId: joi.string().required().min(24).max(24)
    })
}

const addToFavouritesValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        movieId: joi.string().required().min(24).max(24)
    })
}

const removeFromFavouritesValidation = {
    params: joi.object().required().options({abortEarly: false}).keys({
        movieId: joi.string().required().min(24).max(24)
    })
}

const getFavouritesValidation = {
    query: joi.object().options({abortEarly: false}).keys({
        pageNumber: joi.number(),
        size: joi.number()
    })
}


module.exports = {
    signupValidation,
    loginValidation,
    forgetPasswordValidation, 
    resetPasswordValidation,
    changePasswordValidation,
    getUserValidation,
    updateUserValidation,
    updatePasswordValidation,
    logoutValidation,
    addToFavouritesValidation,
    removeFromFavouritesValidation,
    getFavouritesValidation
}