const express = require('express')
const tfa = require('node-2fa');
const app = express()
const port = 7413

app.get('/', (req, res) => {
    res.send({
        docs: 'https://docs.2fa.pw'
    })
})

app.get('/token', (req, res) => {
    if(!req.header('X-SECRET')) {
        res.send({
            success: false,
            error: [
                'Please include the secret via X-SECRET header',
                'Refer to the docs below',
            ],
            docs: 'https://docs.2fa.pw'
        });
    } else {
        let opts = {
            step: 30
        };
        res.send({
            success: true,
            token: tfa.generateToken(req.header('X-SECRET')).token,
            ttl: 30 - (Math.floor(Date.now() / 1000) % 30),
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})