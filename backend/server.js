const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')

app.use(bodyParser.raw({ type: '*/*' }))

let serverState = {
    items: {}
}

app.post('/items', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    if (!serverState.items[parsedBody.listName]) serverState.items[parsedBody.listName] = []
    res.send(JSON.stringify(serverState.items[parsedBody.listName]));
})

app.post('/addItem', (req, res) => {
    let parsedBody = JSON.parse(req.body.toString())
    // The following could be rewritten in a shorter way using push.
    // I'm trying to ween everyone off of push
    if (!serverState.items[parsedBody.listName]) serverState.items[parsedBody.listName] = []
    serverState.items[parsedBody.listName] = serverState.items[parsedBody.listName].concat(parsedBody.input)
    res.send(JSON.stringify(serverState.items[parsedBody.listName]));
})

app.post('/delete', (req, res)=>{
    let parsedBody = JSON.parse(req.body.toString())
    res.send(JSON.stringify(serverState.items[parsedBody.listName]=[]))
})

app.post('/reverse', (req, res)=>{
    let parsedBody = JSON.parse(req.body.toString())
        res.send(JSON.stringify(serverState.items[parsedBody.listName].reverse()))
})

app.listen(4000, () => console.log('Example app listening on port 4000!'))
