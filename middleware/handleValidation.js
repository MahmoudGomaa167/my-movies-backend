const headerMethods = ['body', 'params', 'query']

const handleValidation = (schema) => {
    return (req, res, next) => {
        try {
            let errors = [];
            headerMethods.forEach(key => {
                if (schema[key]) {
                    let validation = schema[key].validate(req[key])
                    if (validation.error) {
                        errors = validation.error.details
                    }
                }
            })

            if (errors.length) {
                res.status(400).json({ message: "Validation Error", errors })
            } else {
                next()
            }
        } catch (error) {
            res.status(500).json({ message: "internal server error", error })
        }

    }
}

module.exports = handleValidation