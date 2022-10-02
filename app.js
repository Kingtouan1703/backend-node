const http = require('http')
const url = require('url')
const mongoose = require('mongoose')
const mongoDbUrl =
  'mongodb+srv://redutdep13:redutdep17@cluster0.8roqwq1.mongodb.net/?retryWrites=true&w=majority'

const RoomModel = require('./models/room.model')
const UserModel = require('./models/user.model')
const handleError = (res) => {
  res.write(JSON.stringify({ msg: 'invalid data', code: 400 }))
  res.end('\n')
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  // cors
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  // exact req path name
  let parsedURL = url.parse(req.url, true)
  let path = parsedURL.pathname
  path = path.replace(/^\/+|\/+$/g, '')
  let chunks = []
  req.on('data', async (chunk) => {
    chunks.push(chunk)
  })
  req.on('end', async function () {
    const buf = Buffer.concat(chunks)
    let data
    if (buf.length > 0) {
      data = JSON.parse(buf.toString())
    }
    if (path === 'create-room') {
      const payload = {
        msg: 'create room success',
        code: 200
      }
      try {
        const room = new RoomModel({ ...data })
        const result = await room.save()
        res.writeHead(200)
        res.write(JSON.stringify(payload))
        res.end('\n')
      } catch (error) {
        handleError(res)
        console.log('why')
      }
    }
    if (path === 'get-rooms') {
      const filter = {}
      const all = await RoomModel.find(filter)
      console.log(all)
      res.writeHead(200)
      res.write(
        JSON.stringify({
          msg: 200,
          data: all
        })
      )
      res.end('\n')
    }
    if (path === 'delete-room') {
      try {
        const doc = await RoomModel.findById(data._id)
        doc.remove()
        res.writeHead(200)
        res.write(JSON.stringify({ msg: 'delete success', code: 200 }))
        res.end('\n')
      } catch (error) {
        handleError(res)
      }
    }
    if (path === 'register') {
      try {
        console.log(data)
        const user = new UserModel({ ...data })
        const result = await user.save()
        res.writeHead(200)
        res.write(
          JSON.stringify({
            msg: 200,
            data: 'register '
          })
        )
        res.end('\n')
      } catch (error) {
        handleError(res)
      }
    }
  })
})

// server should listen after connect db

mongoose
  .connect(mongoDbUrl)
  .then((res) => {
    console.log('connected db')
    server.listen(8080, function () {
      console.log('Listening on port 8080')
    })
  })
  .catch((err) => console.log(err))
