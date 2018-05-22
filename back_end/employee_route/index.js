const express = require('express')
const { getAllEmployees, getEmployeeById } = require('./employee_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/employees').get(getAllEmployees)
  router.route('/employees/:id').get(getEmployeeById)

  return router
}

module.exports = {
  getRouter
}
