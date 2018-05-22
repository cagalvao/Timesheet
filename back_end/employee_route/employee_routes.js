'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const employee = require('./employee')

function getEmployeeById (req, res) {
  Promise.coroutine(function * () {
    const { id } = req.params

    try {
      const employeeObj = yield employee.getEmployee(id)

      if (_.isEmpty(employeeObj)) {
        return res.sendStatus(404)
      }
      return res.json(employeeObj)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })()
}

function getAllEmployees (req, res) {
  Promise.coroutine(function * () {
    try {
      const employees = yield employee.getEmployees()

      if (_.isEmpty(employees)) {
        return res.sendStatus(404)
      }
      return res.json(employees)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })()
}

module.exports = {
  getAllEmployees,
  getEmployeeById
}
