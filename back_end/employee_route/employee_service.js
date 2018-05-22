const db = require('../utils/db')

async function getEmployees () {
  const employees = await db.query('SELECT * FROM employee')

  return employees
}

async function getEmployee (employeeId) {
  const employee = await db.query(`SELECT * FROM employee where id = ${employeeId}`)

  return employee
}

module.exports = {
  getEmployees,
  getEmployee
}
