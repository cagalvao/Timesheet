'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const timesheet = require('./timesheet_service')

function getTimesheet (res, params) {
  Promise.coroutine(function * () {
    try {
      const timesheets = yield timesheet.listTimesheets(params)

      if (_.isEmpty(timesheets)) {
        return res.sendStatus(404)
      }
      return res.json(timesheets)
    } catch (err) {
      res.status(500)
      return res.send(err.message)
    }
  })()
}

function getEmployeeTimesheet (req, res) {
  Promise.coroutine(function * () {
    const { employee } = req.params
    return getTimesheet(res, { employee })
  })()
}

function getEmployeeTimesheetByYear (req, res) {
  Promise.coroutine(function * () {
    const { employee, year } = req.params
    return getTimesheet(res, { employee, year })
  })()
}

function getEmployeeTimesheetByMonth (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month } = req.params
    return getTimesheet(res, { employee, year, month })
  })()
}

function getEmployeeTimesheetByDay (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month, day } = req.params
    return getTimesheet(res, { employee, year, month, day })
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
      res.status(500)
      return res.send(err.message)
    }
  })()
}

function editTimesheet (req, res) {
  Promise.coroutine(function * () {
    const params = Object.assign({}, req.body)

    try {
      const affectedRows = yield timesheet.editTimesheet(params)

      if (affectedRows === 0) {
        return res.sendStatus(404)
      }
      return res.sendStatus(200)
    } catch (err) {
      res.status(500)
      return res.send(err.message)
    }
  })()
}

module.exports = {
  getEmployeeTimesheet,
  getEmployeeTimesheetByYear,
  getEmployeeTimesheetByMonth,
  getEmployeeTimesheetByDay,
  insertTimesheet,
  editTimesheet
}
