

const paginate = (page, limit) => {
    try {
        if(!page || page <= 0){
            page = 1
        }
        if(!limit){
            limit = 8
        }

        let skip = (page - 1) * limit
        return {skip, limit, page}
    } catch (error) {
        return error
    }
}

module.exports = {paginate}