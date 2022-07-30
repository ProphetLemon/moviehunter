const express = require('express')
const router = express.Router()
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
router.get('/', (req, res) => {
    res.redirect('/')
})

//Wrapper https://github.com/grantholle/moviedb-promise

router.post('/', async (req, res) => {
    var genres = await getGenresByLanguage('es') + await getGenresByLanguage('en') + await getGenresByLanguage('de')
    genres = genres.substring(0, genres.length - 3)
    var datos = { language: req.body.language, genres: genres, darkMode: req.body.darkMode ? req.body.darkMode : 'off' }
    var parameters = { language: req.body.language }

    if (req.body.genre) {
        parameters["with_genres"] = req.body.genre
        datos["genre"] = req.body.genre
    }
    if (req.body.sort_by) {
        parameters["sort_by"] = req.body.sort_by
        datos["sort_by"] = req.body.sort_by
    }

    parameters["vote_count.gte"] = req.body.min_vote ? req.body.min_vote : 0
    datos["min_vote"] = req.body.min_vote ? req.body.min_vote : 0

    parameters["vote_average.gte"] = req.body.min_avg ? req.body.min_avg : 0
    datos["min_avg"] = req.body.min_avg ? req.body.min_avg : 0


    if (req.body.title) {
        parameters['query'] = req.body.title
        datos['title'] = req.body.title
        moviedb
            .searchMovie(parameters)
            .then((resMovie) => {
                res.render('index', { resMovie: resMovie, datos: datos })
            })
            .catch(console.error)
        return
    }
    moviedb.discoverMovie(parameters)
        .then((resMovie) => {
            res.render('index', { resMovie: resMovie, datos: datos })
        })
        .catch(console.error)
    return
})


global.getGenresByLanguage = async function (language) {
    var genres = await (await moviedb.genreMovieList({ language: language })).genres
    var final = ""
    for (let i = 0; i < genres.length; i++) {
        final += `${genres[i].id}-${genres[i].name},`
    }
    return final.substring(0, final.length - 1) + "COI"
}

module.exports = router