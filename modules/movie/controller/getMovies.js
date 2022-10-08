const { paginate } = require('../../../common/paginate')
const movieModel = require('../../../DB/models/Movies')


const getMovies = async (req, res) => {
    let { pageNumber, size, searchKey, genre } = req.query
    const { type } = req.params
    const { skip, limit, page } = paginate(pageNumber, size)

    if (!searchKey && !genre) {
        const moviesLength = await movieModel.find({ type }).countDocuments({})
        const movies = await movieModel.find({ type }).limit(limit).skip(skip)
        res.status(200).json({ message: "Done", currentPage: Number(page), numOfPages: Math.ceil(moviesLength / limit), movies })
    } else {
        const title = new RegExp(searchKey, 'i')
        if (title && genre) {
            const moviesSearchLength = await movieModel.countDocuments({ type, $and: [{ genre }, { title }] })
            const movies = await movieModel.find({ type, $and: [{ genre }, { title }] }).limit(limit).skip(skip)
            res.status(200).json({ message: "Done", currentPage: Number(page), limit, numOfPages: Math.ceil(moviesSearchLength / limit), movies })
        }else if(!title && genre){
            const moviesSearchLength = await movieModel.countDocuments({ type, $or: [{ genre }] })
            const movies = await movieModel.find({ type, $or: [{ genre }] }).limit(limit).skip(skip)
            res.status(200).json({ message: "Done", currentPage: Number(page), limit, numOfPages: Math.ceil(moviesSearchLength / limit), movies })
        }else{
            const moviesSearchLength = await movieModel.countDocuments({ type, title })
            const movies = await movieModel.find({ type, title }).limit(limit).skip(skip)
            res.status(200).json({ message: "Done", currentPage: Number(page), limit, numOfPages: Math.ceil(moviesSearchLength / limit), movies })
        }
    }
}

module.exports = getMovies