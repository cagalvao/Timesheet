'use strict'
const express = require('express')
const routes = require('./workday_routes')

function getRouter () {
  const router = express.Router({ mergeParams: true })

  router.route('/workdays').get(routes.getAllWorkdays)
  router.route('/workdays/new').put(routes.insertWorkday)

  return router
}

module.exports = {
  getRouter
}
