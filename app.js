const express = require('express')
const signature = require('./signature')
const app = express()

app.post('/generate', (req, res) => {

    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Start server at port 3000.')
})

