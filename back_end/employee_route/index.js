'use strict'

const express = require('express')
const { getAllEmployees, getEmployeeById } = require('./employee_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/getEmployees').get(getAllEmployees)
  router.route('/getEmployee/:id').get(getEmployeeById)

  return router
}

module.exports = {
  getRouter
}
