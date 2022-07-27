const express = require("express")
const app = express()
const finderRouter = require('./routes/results')
app.set('view engine', 'ejs')

app.use('/results', finderRouter)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000)