'use strict'

async function getEmployees () {
  const db = require('../utils/db')
  const employees = await db.query('SELECT * FROM employee')

  return employees
}

async function getEmployee (employeeId) {
  const db = require('../utils/db')
  const employee = await db.query(`SELECT * FROM employee where id = ${employeeId}`)

  return employee[0]
}

module.exports = {
  getEmployees,
  getEmployee
}
