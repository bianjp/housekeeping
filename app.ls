express = require 'express'
path = require 'path'
logger = require 'morgan'
cookieParser = require 'cookie-parser'
bodyParser = require 'body-parser'
session = require 'express-session'
MongoStore = require 'express-session-mongo'
config = require './bin/config/config'

app = express!

# view engine setup
app.set 'views', path.join __dirname, 'src/views'
app.set 'view engine', 'jade'

app.use bodyParser.json!
app.use bodyParser.urlencoded!
app.use cookieParser!
app.use session do
  secret: config.cookieSecret
  saveUninitialized: false
  resave: false
  cookie:
    maxAge: 604800000  # One week. It's milliseconds.
  store: new MongoStore do
    db: config.database.name
    ip: config.database.host
    port: config.database.port

app.use express.static path.join __dirname, 'public'

if (app.get 'env')  === 'development'
  app.use logger 'dev'

# make session accessible in templates
app.use (req, res, next)!->
  res.locals.currentUser = req.session.user
  next!

# template helpers
require './bin/lib/helpers' <| app

db = require './bin/lib/db'
db.connect (db)!->
  app.set 'port', process.env.PORT || 3000
  app.listen app.get 'port'

  # routes
  app.use require './bin/routes/routes'

  # catch 404 and forward to error handler
  app.use (req, res, next)->
    err = new Error 'Not Found'
    err.status = 404
    next err

  # development error handler
  # will print stacktrace
  if (app.get 'env')  === 'development'
    app.use (err, req, res, next)->
      console.log err
      res.status err.status || 500
      res.render 'error', do
        message: err.message
        error: err

  # production error handler
  # no stacktraces leaked to user
  app.use (err, req, res, next)->
    res.status err.status || 500
    res.render 'error', do
      message: err.message
      error: {}
