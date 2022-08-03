const express = require("express");
require('dotenv').config();
const app = express();
const methodOverride = require('method-override');
var path = require('path');
const resultsRouter = require('./routes/results')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'src')));
const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb(process.env.MOVIEDB_API)
app.get('/', async (req, res) => {
    var genres = await getGenresByLanguage('es', 'movie') + await getGenresByLanguage('en', 'movie') + await getGenresByLanguage('de', 'movie')
    var parameters = { language: 'es', sort_by: 'popularity.desc' }
    genres = genres.substring(0, genres.length - 3)
    var datos = { language: 'es', sort_by: 'popularity.desc', type: 'movie', min_vote: 0, min_avg: 0, genres: genres }
    moviedb.discoverMovie(parameters)
        .then(async (resMovie) => {
            await whereToWatch('es', 'movie', resMovie)
            res.render('index', { resMovie: resMovie, datos: datos })
        })
        .catch(console.error)
    return
});

app.use('/results', resultsRouter)

app.listen(process.env.PORT || 5000);