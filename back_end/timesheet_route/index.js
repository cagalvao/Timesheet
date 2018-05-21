'use strict'

const express = require('express')

const {
  getEmployeeTimesheet,
  getEmployeeTimesheetByYear,
  getEmployeeTimesheetByMonth,
  getEmployeeTimesheetByDay
} = require('./timesheet_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/getTimesheet/:employee').get(getEmployeeTimesheet)
  router.route('/getTimesheet/:employee/:year').get(getEmployeeTimesheetByYear)
  router.route('/getTimesheet/:employee/:year/:month').get(getEmployeeTimesheetByMonth)
  router.route('/getTimesheet/:employee/:year/:month/:day').get(getEmployeeTimesheetByDay)

  return router
}

module.exports = {
  getRouter
}
