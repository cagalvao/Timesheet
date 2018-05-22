const db = require('../utils/db')

async function getEmployees () {
  const employees = await db.query('SELECT * FROM MONO.employee')

  return employees
}

async function getEmployee (employeeId) {
  const employee = await db.query(`SELECT * FROM MONO.employee where id = ${employeeId}`)

  return employee
}

module.exports = {
  getEmployees,
  getEmployee
}
