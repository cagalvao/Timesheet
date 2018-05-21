var express = require('express')
var app = express()
var httpServer = require('http').Server(app)

var openHttpConnections = {}

var bodyParser = require('body-parser')

var port = 4000

enableCORS()

attachErrorHandlers()
attachRouters()
attachHttpServer()

app.use(bodyParser.json())
app.use(handleError)

app.get('/', function (req, res) {
  res.send('The MONO_API lives!')
})

function enableCORS () {
  app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

    const allowedHeaders = 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, Expires, login, registration, Authorization, X-Session-Id'
    const exposedHeaders = 'Content-Disposition, Filename, X-Soft-Token'

    res.header('Access-Control-Allow-Headers', allowedHeaders)
    res.header('Access-Control-Expose-Headers', exposedHeaders)

    next()
  })

  console.log('CORS enabled')
}

function attachErrorHandlers () {
  process.on('uncaughtException', function (err) {
    console.log('Uncaught exception ', err)

    shutdown()
  })

  process.on('SIGTERM', function () {
    console.log('Received SIGTERM')

    shutdown()
  })

  process.on('SIGINT', function () {
    console.log('Received SIGINT')

    shutdown()
  })

  console.log('Error handlers attached')
}

function attachRouters () {
  app.use(require('./test_route').getRouter())
  app.use(require('./db_route').getRouter())
  app.use(require('./timesheet_route').getRouter())
  app.use(require('./employee_route').getRouter())

  console.log('Routers attached')
}

function attachHttpServer () {
  httpServer.on('connection', function (conn) {
    var key = conn.remoteAddress + ':' + (conn.remotePort || '')

    openHttpConnections[key] = conn

    conn.on('close', function () {
      delete openHttpConnections[key]
    })
  })

  try {
    httpServer.listen(port, function () {
      console.log('Webserver listening on localhost:' + port)
    })
  } catch (err) {
    console.log('Error occurred creating database connection pool', err)
    console.log('Exiting process')
    process.exit(1)
  }

  console.log('HTTP Server attached')
}

function handleError (err, req, res, next) {
  res.status(500).send({
    message: 'An error has occurred, please contact support if the error persists',
    error: err
  })
  shutdown()
}

function shutdown () {
  console.log('Shutting down')
  console.log('Closing web server')

  httpServer.close(function () {
    console.log('Web server closed')

    process.exit(1)
  })
}
