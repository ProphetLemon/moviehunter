const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Aqui saldrán resultados")
})

module.exports = router