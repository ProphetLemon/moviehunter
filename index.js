const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send("IMDB Finder")
})

app.listen(5000)