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


app.get('/', (req, res) => {
    res.render('index');
});

app.use('/results', resultsRouter)

app.listen(process.env.PORT || 5000);