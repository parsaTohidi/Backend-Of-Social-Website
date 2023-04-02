require('dotenv').config()
import express from 'express'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import requestRoutes from './routes/request'
import tooBusy from 'toobusy-js'
import database from './lib/database'
import redisClient from './lib/redis'

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use((req, res, next) => {
  req.redisClient = redisClient
  next()
})

app.use(function (req, res, next) {
  if (tooBusy()) {
    res.status(503).send("The server is busy right now, Try again later.")
  } else {
    next()
  }
})

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/request', requestRoutes)
app.get('/healthcheck', (req, res) => {
  res.send({ status: 'OK' })
})

redisClient.connect()
  .then(async () => {
    const port = process.env.PORT || 3000

    await database.connect()

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    })
  })
  .catch(err => {
    console.log(err)
  })

export default app
