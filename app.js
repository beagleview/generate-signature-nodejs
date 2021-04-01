const express = require('express')
const bodyParser = require('body-parser')
const signature = require('./signature')
const config = require('./config/keyconfig')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/generate', (req, res) => {
    const timestamp = req.header("timestamp")
    const data = req.body + timestamp
    const sigRes = signature.generate(config.key.private_key,data)
    res.send(sigRes)
})
app.post('/verify', (req, res) => {
    const signature = req.header("Content-Signature")
    const timestamp = req.header("timestamp")

    const verifyRes = signature.verify(config.key.public_key,"","")
    res.send(verifyRes)
})


app.listen(3000, () => {
    console.log('Start server at port 3000.')
})

