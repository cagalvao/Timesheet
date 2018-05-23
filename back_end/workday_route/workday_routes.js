'use strict'
const _ = require('lodash')
const Promise = require('bluebird')

const workday = require('./workday_service')

function getAllWorkdays (req, res) {
  Promise.coroutine(function * () {
    try {
      const workdays = yield workday.listWorkdays()

      if (_.isEmpty(workdays)) {
        return res.sendStatus(404)
      }
      return res.json(workdays)
    } catch (err) {
      res.status(500)
      return res.send(err.message)
    }
  })()
}

function insertWorkday (req, res) {
  Promise.coroutine(function * () {
    const params = req.body

    try {
      const workdayObj = yield workday.insertWorkday(params)

      if (_.isEmpty(workdayObj)) {
        return res.sendStatus(404)
      }
      return res.json(workdayObj)
    } catch (err) {
      res.status(500)
      return res.send(err.message)
    }
  })()
}

module.exports = {
  getAllWorkdays,
  insertWorkday
}
