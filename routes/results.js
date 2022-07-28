const express = require('express')
const router = express.Router()
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
router.get('/', (req, res) => {
    res.send("Aqui saldrán resultados")
})

//Wrapper https://github.com/grantholle/moviedb-promise

router.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.titulo) {
        moviedb
            .searchMovie({ query: req.body.titulo, language: 'es' })
            .then((resMovie) => {
                console.log(resMovie)
                res.render('index')
            })
            .catch(console.error)
    }
    var parameters = { language: 'es' }
    if (req.body.genero) {
        parameters["with_genres"] = req.body.genero
    }
    if (req.body.min_vote) {
        parameters["vote_count.gte"] = req.body.min_vote
    }
    if (req.body.min_avg) {
        parameters["vote_average.gte"] = req.body.min_avg
    }
    moviedb.discoverMovie(parameters)
        .then((resMovie) => {
            console.log(resMovie)
            res.render('index')
        })
        .catch(console.error)


})

module.exports = router