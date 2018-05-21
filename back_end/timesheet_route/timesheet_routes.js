'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const timesheet = require('./timesheet')

function getTimesheet (req, res, params) {
  Promise.coroutine(function * () {
    return timesheet.getTimesheetsFromDb(params, function (err, rows, field) {
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

module.exports = {
  getEmployeeTimesheet,
  getEmployeeTimesheetByYear,
  getEmployeeTimesheetByMonth,
  getEmployeeTimesheetByDay
}
