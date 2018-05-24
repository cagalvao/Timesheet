'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Promise = require('bluebird')
const testingUtils = require('../../utils/testing')

require('should-sinon')

describe('/timesheet_service', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('listTimesheets', function () {
    it('listTimesheets with employee should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const params = {
        employee: 2
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const timesheets = yield service.listTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('listTimesheets with employee, year should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const params = {
        employee: 2,
        year: 2099
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const timesheets = yield service.listTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('listTimesheets with employee, year, month should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const params = {
        employee: 2,
        year: 2099,
        month: 30
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const timesheets = yield service.listTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('listTimesheets with employee, year, month, day should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const params = {
        employee: 2,
        year: 2099,
        month: 30,
        day: 66
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const timesheets = yield service.listTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })
  })

  describe('insertTimesheet', function () {
    it('insertTimesheet should return with SUCCESS', function (done) {
      const response = [{
        name: 'Cássio Galvão',
        workday: '04/06/2018',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }]

      const workdayResponse = [
        {
          id: 11
        }
      ]

      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves({})
          .onCall(1).resolves({ insertId: 31 })
          .onCall(2).resolves({ insertId: 99 })
          .onCall(3).resolves(response)
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves(workdayResponse)
        }
      })

      Promise.coroutine(function * () {
        const timesheet = yield service.insertTimesheet(body)
        timesheet.should.deepEqual(response[0])

        done()
      })()
    })
  })
})
