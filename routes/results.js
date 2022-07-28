const express = require('express')
const router = express.Router()
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
router.get('/', (req, res) => {
    res.send("Aqui saldrán resultados")
})

//Wrapper https://github.com/grantholle/moviedb-promise

router.post('/', (req, res) => {
    console.log(req.body.titulo)
    moviedb
        .searchMovie({ query: req.body.titulo })
        .then((resMovie) => {
            console.log(resMovie)
            res.redirect('/')
        })
        .catch(console.error)

})

module.exports = router