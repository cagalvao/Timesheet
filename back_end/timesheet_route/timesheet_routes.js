'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const timesheet = require('./timesheet_service')

function getTimesheet (req, res, params) {
  Promise.coroutine(function * () {
    try {
      const timesheets = yield timesheet.listTimesheets(params)

      if (_.isEmpty(timesheets)) {
        return res.sendStatus(404)
      }
      return res.json(timesheets)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })()
}

function getEmployeeTimesheet (req, res) {
  Promise.coroutine(function * () {
    const { employee } = req.params
    return getTimesheet(req, res, { employee })
  })()
}

function getEmployeeTimesheetByYear (req, res) {
  Promise.coroutine(function * () {
    const { employee, year } = req.params
    return getTimesheet(req, res, { employee, year })
  })()
}

function getEmployeeTimesheetByMonth (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month } = req.params
    return getTimesheet(req, res, { employee, year, month })
  })()
}

function getEmployeeTimesheetByDay (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month, day } = req.params
    return getTimesheet(req, res, { employee, year, month, day })
  })()
}

function insertTimesheet (req, res) {
  Promise.coroutine(function * () {
    const params = Object.assign({}, req.body)

    try {
      const employeeTimesheet = yield timesheet.insertTimesheet(params)

      if (_.isEmpty(employeeTimesheet)) {
        return res.sendStatus(404)
      }
      return res.json(employeeTimesheet)
    } catch (err) {
      return res.status(500).send(err.message)
    }
  })()
}

module.exports = {
  getEmployeeTimesheet,
  getEmployeeTimesheetByYear,
  getEmployeeTimesheetByMonth,
  getEmployeeTimesheetByDay,
  insertTimesheet
}
