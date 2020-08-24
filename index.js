const express = require('express')
const tfa = require('node-2fa');
const app = express()
const port = 7413

app.get('/', (req, res) => {
    res.send({
        title: 'Open 2FA',
        description: 'Open 2FA is a two-factor authentication project',
        github: 'https://github.com/brunotimsa/open-2fa-backend-js',
        docs: 'https://docs.2fa.pw'
    })
})

app.get('/token', (req, res) => {
    if(!req.header('X-SECRET')) {
        res.status(400).send({
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

app.get('/tea', (req, res) => {
    res.status(418).send("☕");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})