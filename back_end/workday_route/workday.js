const db = require('../utils/db')

const workdayQuery = 'SELECT id, DATE_FORMAT(workday, "%d/%m/%Y") as workday FROM workday'

async function listWorkdays () {
  return await db.query(workdayQuery)
}

async function insertWorkday (params) {
  const { workday } = params
  let existingWorkday = await getWorkdayByDate(workday)

  if (existingWorkday.length === 0) {
    const result = await db.query(`INSERT INTO workday (workday) VALUES ("${workday}")`)
    existingWorkday = await getWorkdayById(result.insertId)
  }

  return existingWorkday[0]
}

async function getWorkdayId (workday) {
  const result = await db.query(`SELECT id FROM workday where workday = "${workday}"`)

  if (result.length > 0 && result[0].id) {
    return result[0].id
  } else {
    return await insertWorkday(workday)
  }
}

async function getWorkdayById (id) {
  return await db.query(`${workdayQuery} where id = "${id}"`)
}

async function getWorkdayByDate (workday) {
  return await db.query(`${workdayQuery} where workday = "${workday}"`)
}

module.exports = {
  listWorkdays,
  getWorkdayId,
  insertWorkday
}
