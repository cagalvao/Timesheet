'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const employee = require('./employee')

function getEmployeeById (req, res) {
  Promise.coroutine(function * () {
    const { id } = req.params

    return employee.getEmployeeFromDb(id, function (err, rows, field) {
      if (!err) {
        if (_.isEmpty(rows)) {
          return res.sendStatus(404)
        }
        return res.json(rows)
      } else {
        res.status(500)
        return res.send(err.message)
      }
    })
  })()
}

function getAllEmployees (req, res) {
  Promise.coroutine(function * () {
    return employee.getEmployeesFromDb(function (err, rows, field) {
      if (!err) {
        if (_.isEmpty(rows)) {
          return res.sendStatus(404)
        }
        return res.json(rows)
      } else {
        res.status(500)
        return res.send(err.message)
      }
    })
  })()
}

module.exports = {
  getAllEmployees,
  getEmployeeById
}
