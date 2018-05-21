'use strict'

const express = require('express')
const { getEmployees, getEmployee } = require('./employee_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/getEmployees').get(getEmployees)
  router.route('/getEmployee/:id').get(getEmployee)

  return router
}

module.exports = {
  getRouter
}
