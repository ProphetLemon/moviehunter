const express = require('express')
const router = express.Router()
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
router.get('/', (req, res) => {
    res.redirect('/')
})

//Wrapper https://github.com/grantholle/moviedb-promise

router.post('/', async (req, res) => {
    var datos = { language: req.body.language, page: req.body.pageNumber, type: req.body.type, genres: genres, darkMode: req.body.darkMode ? req.body.darkMode : 'off' }
    var parameters = { language: req.body.language, page: req.body.pageNumber }
    var genres = await getGenresByLanguage('es', datos['type']) + await getGenresByLanguage('en', datos['type']) + await getGenresByLanguage('de', datos['type'])
    genres = genres.substring(0, genres.length - 3)
    datos['genres'] = genres
    if (req.body.genre) {
        parameters["with_genres"] = req.body.genre
        datos["genre"] = req.body.title ? '' : req.body.genre
    }
    if (req.body.sort_by) {
        parameters["sort_by"] = req.body.sort_by
        datos["sort_by"] = req.body.title ? '' : req.body.sort_by
    }

    parameters["vote_count.gte"] = req.body.min_vote ? req.body.min_vote : 0
    datos["min_vote"] = req.body.title ? 0 : (req.body.min_vote ? req.body.min_vote : 0)

    parameters["vote_average.gte"] = req.body.min_avg ? req.body.min_avg : 0
    datos["min_avg"] = req.body.title ? 0 : (req.body.min_avg ? req.body.min_avg : 0)


    if (req.body.title) {
        parameters['query'] = req.body.title
        if (datos['type'] == 'movie') {
            moviedb
                .searchMovie(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        } else if (datos['type'] == 'tv') {
            moviedb
                .searchTv(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        }
    } else {
        if (datos['type'] == 'movie') {
            moviedb.discoverMovie(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        } else if (datos['type'] == 'tv') {
            moviedb.discoverTv(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        }

    }

    return
})

/**
 * 
 * @param {string} language 
 * @param {string} type 
 * @param {*} resMovie 
 */
global.whereToWatch = async function (language, type, resMovie) {
    language = language == 'en' ? 'us' : language
    if (type == 'movie') {
        for (result of resMovie['results']) {
            var watchProviders = await moviedb.movieWatchProviders(result.id)
            result.watchProviders = watchProviders.results[language.toUpperCase()]
        }
    } else if (type == 'tv') {
        for (result of resMovie['results']) {
            var watchProviders = await moviedb.tvWatchProviders(result.id)
            result.watchProviders = watchProviders.results[language.toUpperCase()]
        }
    }

}


global.getGenresByLanguage = async function (language, type) {
    if (type == 'movie') {
        var genres = await (await moviedb.genreMovieList({ language: language })).genres
    } else if (type == 'tv') {
        var genres = await (await moviedb.genreTvList({ language: language })).genres
    }

    var final = ""
    for (let i = 0; i < genres.length; i++) {
        final += `${genres[i].id}-${genres[i].name},`
    }
    return final.substring(0, final.length - 1) + "COI"
}

module.exports = router