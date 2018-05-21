'use strict'

const Promise = require('bluebird')
const db = require('../utils/db.js')

function getEmployee (req, res) {
  Promise.coroutine(function * () {
    const { id } = req.params
    const conn = db.createConnection()

    conn.query('SELECT * FROM MONO.employee where id = ' + id, function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      } else {
        res.status(500)
        return res.send(err)
      }
    })
  })()
}

function getEmployees (req, res) {
  Promise.coroutine(function * () {
    const conn = db.createConnection()

    conn.query('SELECT * FROM MONO.employee', function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      } else {
        res.status(500)
        return res.send(err)
      }
    })
  })()
}

module.exports = {
  getEmployees,
  getEmployee
}
