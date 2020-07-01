const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const got = require('got')

const port = process.env.PORT || 5000
const public = path.resolve('./public')
const api = path.resolve('./api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/check', (req, res) => {
  res.sendFile(api + '/example.json')
})

app.get('/reply/:type', (req, res) => {
  res.sendFile(public + '/reply.html')
})

app.use(express.static('./public'))

app.listen(port, () => console.log(`Example app listening on port ${port}`))

app.post('/reply', async (req, res) => {
  // api call and formatting
  const { body } = await got('http://localhost:5000/check')

  let apiBody = JSON.parse(body)

  // grabbing the input from the form through the request
  let name = req.body.name
 
  let quest = req.body.quest
  
  let color = req.body.color

  if(name === apiBody.name && quest === apiBody.quest && color === apiBody.color) {
    res.redirect('/reply/true')
  } else {
    res.redirect('/reply/false')
  }
  
})

app.get('*', (req, res) => {
  res.sendFile(public + '/404.html')
})

