'use strict'
const workdayQuery = 'SELECT id, DATE_FORMAT(workday, "%d/%m/%Y") as workday FROM workday'

async function listWorkdays () {
  const db = require('../utils/db')
  const workdays = await db.query(workdayQuery)

  return workdays
}

async function insertWorkday (params) {
  const db = require('../utils/db')
  const { workday } = params
  let existingWorkday = await getWorkdayByDate(workday)

  if (existingWorkday.length === 0) {
    const result = await db.query(`INSERT INTO workday (workday) VALUES ("${workday}")`)
    existingWorkday = await getWorkdayById(result.insertId)
  }

  return existingWorkday[0]
}

async function getWorkdayId (workday) {
  const db = require('../utils/db')
  const result = await db.query(`SELECT id FROM workday where workday = "${workday}"`)

  if (result.length > 0 && result[0].id) {
    return result[0].id
  } else {
    const newObj = await insertWorkday(workday)
    return newObj
  }
}

async function getWorkdayById (id) {
  const db = require('../utils/db')
  const workday = await db.query(`${workdayQuery} where id = "${id}"`)
  return workday
}

async function getWorkdayByDate (workday) {
  const db = require('../utils/db')
  const newObj = await db.query(`${workdayQuery} where workday = "${workday}"`)
  return newObj
}

module.exports = {
  listWorkdays,
  getWorkdayId,
  insertWorkday
}
