const express = require('express')
const bodyParser = require('body-parser')
const signature = require('./signature')
const config = require('./config/keyconfig')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/generate', (req, res) => {
    const timestamp = req.header("timestamp")
    const data = timestamp
    const sigRes = signature.generate(config.private_key,data)
    res.send(sigRes)
})
app.get('/verify', (req, res) => {
    const sign = req.header("Content-Signature")
    const timestamp = req.header("timestamp")

    const data = timestamp
    const verifyRes = signature.verify(config.public_key,sign,data)
    res.send(verifyRes)
})


app.listen(3000, () => {
    console.log('Start server at port 3000.')
})

