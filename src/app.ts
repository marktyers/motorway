
/* app.ts */

import Express, { json } from 'express'

import routes from './routes.js'

const app = Express()

app.use(json())
app.use(function (req, res, next) {
  res.header('Content-Type','application/json')
  next()
})

app.use('/', routes)

export default app
