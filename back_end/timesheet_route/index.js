'use strict'
const express = require('express')

const routes = require('./timesheet_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/timesheets/:employee').get(routes.getEmployeeTimesheet)
  router.route('/timesheets/:employee/:year').get(routes.getEmployeeTimesheetByYear)
  router.route('/timesheets/:employee/:year/:month').get(routes.getEmployeeTimesheetByMonth)
  router.route('/timesheets/:employee/:year/:month/:day').get(routes.getEmployeeTimesheetByDay)
  router.route('/timesheets/new').put(routes.insertTimesheet)
  router.route('/timesheets/edit').post(routes.editTimesheet)
  router.route('/timesheets/add').put(routes.addTimesheetEntry)
  router.route('/timesheets/delete').delete(routes.deleteTimesheet)

  return router
}

module.exports = {
  getRouter
}
