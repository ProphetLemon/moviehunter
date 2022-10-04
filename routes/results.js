const express = require('express')
const router = express.Router()
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
    if (req.body.title) {
        parameters['query'] = req.body.title
        datos['title'] = req.body.title
        if (datos['type'] == 'movie') {
            moviedb
                .searchMovie(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie.results)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        } else if (datos['type'] == 'tv') {
            moviedb
                .searchTv(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie.results)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        }
    } else if (req.body.peopleID) {
        const response = await fetch(`https://api.themoviedb.org/3/person/${req.body.peopleID}/${datos.type}_credits?api_key=${process.env.MOVIEDB_API}&language=${req.body.language}`);
        const data = await response.json();
        data.cast = data.crew.concat(data.cast)
        await whereToWatch(datos.language, datos.type, data.cast)
        datos.peopleName = req.body.peopleName
        datos.peopleID = req.body.peopleID
        res.render('index', { resMovie: data, datos: datos })
    } else {
        if (req.body.watchproviders && req.body.watchproviders != "" && !(Array.isArray(req.body.watchproviders) && req.body.watchproviders.includes(""))) {
            parameters.watch_region = (parameters.language == 'en' ? 'us' : parameters.language).toUpperCase()
            if (req.body.watchproviders == "idc" || req.body.watchproviders.includes("idc")) {
                parameters.with_watch_monetization_types = 'flatrate'
                datos.watchproviders = 'idc'
            } else {
                parameters.with_watch_providers = Array.isArray(req.body.watchproviders) ? req.body.watchproviders.join("|") : req.body.watchproviders
                datos.watchproviders = parameters.with_watch_providers
                parameters.with_watch_providers = parameters.with_watch_providers.split("119").join("119|9")
            }
        }
        if (req.body.genre) {
            parameters["with_genres"] = req.body.genre
            datos["genre"] = req.body.genre
        }
        if (req.body.sort_by) {
            parameters["sort_by"] = req.body.sort_by
            datos["sort_by"] = req.body.sort_by
        }
        parameters["vote_count.gte"] = req.body.min_vote ? req.body.min_vote : 0
        datos["min_vote"] = req.body.title ? 0 : (req.body.min_vote ? req.body.min_vote : 0)
        parameters["vote_average.gte"] = req.body.min_avg ? req.body.min_avg : 0
        datos["min_avg"] = req.body.title ? 0 : (req.body.min_avg ? req.body.min_avg : 0)
        if (datos['type'] == 'movie') {
            moviedb.discoverMovie(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie.results)
                    res.render('index', { resMovie: resMovie, datos: datos })
                })
                .catch(console.error)
        } else if (datos['type'] == 'tv') {
            moviedb.discoverTv(parameters)
                .then(async (resMovie) => {
                    await whereToWatch(datos.language, datos.type, resMovie.results)
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
        for (result of resMovie) {
            var watchProviders = await moviedb.movieWatchProviders(result.id)
            result.watchProviders = watchProviders.results[language.toUpperCase()]
        }
    } else if (type == 'tv') {
        for (result of resMovie) {
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
    final = final.substring(0, final.length - 1).split(",").sort(function (a, b) {
        return a.split("-")[1] > b.split("-")[1] ? 1 : a.split("-")[1] < b.split("-")[1] ? -1 : 0
    }).join(",")
    return final + "COI"
}

module.exports = router