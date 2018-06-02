'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Promise = require('bluebird')
const testingUtils = require('../../utils/testing')
const { expect } = require('chai')

describe('/timesheet_service', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('getTimesheets', function () {
    it('getTimesheets with no employee should return with NOT FOUND', function (done) {
      const params = {}

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub().resolves(undefined)
        }
      })

      Promise.coroutine(function * () {
        const timesheets = yield service.getTimesheets(params)
        /* eslint no-unused-expressions: 0 */
        expect(timesheets).to.be.undefined

        done()
      })()
    })

    it('getTimesheets with employee should return with SUCCESS', function (done) {
      const response = [
        {
          id: 22,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
        },
        {
          id: 23,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
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
        const timesheets = yield service.getTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('getTimesheets with employee, year should return with SUCCESS', function (done) {
      const response = [
        {
          id: 22,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
        },
        {
          id: 23,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
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
        const timesheets = yield service.getTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('getTimesheets with employee, year, month should return with SUCCESS', function (done) {
      const response = [
        {
          id: 22,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
        },
        {
          id: 23,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
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
        const timesheets = yield service.getTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })

    it('getTimesheets with employee, year, month, day should return with SUCCESS', function (done) {
      const response = [
        {
          id: 22,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
        },
        {
          id: 23,
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19',
          diff: '-15:00:05',
          accDiff: '-15:00:05'
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
        const timesheets = yield service.getTimesheets(params)
        timesheets.should.deepEqual(response)

        done()
      })()
    })
  })

  describe('insertTimesheet', function () {
    it('insertTimesheet should return with SUCCESS', function (done) {
      const workdayResponse = [
        {
          id: 11
        }
      ]

      const body = {
        employeeId: 1,
        workday: '04/06/2018',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves({})
          .onCall(1).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves(workdayResponse)
        }
      })

      Promise.coroutine(function * () {
        const timesheet = yield service.insertTimesheet(body)
        timesheet.should.deepEqual(1)

        done()
      })()
    })
  })

  describe('editTimesheet', function () {
    it('editTimesheet should return with SUCCESS', function (done) {
      const body = {
        id: 1,
        workday: '04/06/2018',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves({ affectedRows: 1 })
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.editTimesheet(body)
        affectedRows.should.equal(1)

        done()
      })()
    })
  })

  describe('addTimesheetEntry', function () {
    it('addTimesheetEntry new timesheet should return with SUCCESS', function (done) {
      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(null, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(1)

        done()
      })()
    })

    it('addTimesheetEntry entry_1 should return with SUCCESS', function (done) {
      const response = [{
        id: 22,
        employeeId: 1,
        employeeName: 'Funcionário',
        workdayId: 1,
        workday: '21/05/2018'
      }]

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
          .onCall(1).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(22, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(1)

        done()
      })()
    })

    it('addTimesheetEntry entry_2 should return with SUCCESS', function (done) {
      const response = [{
        id: 22,
        employeeId: 1,
        employeeName: 'Funcionário',
        workdayId: 1,
        workday: '21/05/2018',
        entry_1: '09:00:00'
      }]

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
          .onCall(1).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(22, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(1)

        done()
      })()
    })

    it('addTimesheetEntry entry_3 should return with SUCCESS', function (done) {
      const response = [{
        id: 22,
        employeeId: 1,
        employeeName: 'Funcionário',
        workdayId: 1,
        workday: '21/05/2018',
        entry_1: '09:00:00',
        entry_2: '12:00:00'
      }]

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
          .onCall(1).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(22, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(1)

        done()
      })()
    })

    it('addTimesheetEntry entry_4 should return with SUCCESS', function (done) {
      const response = [{
        id: 22,
        employeeId: 1,
        employeeName: 'Funcionário',
        workdayId: 1,
        workday: '21/05/2018',
        entry_1: '09:00:00',
        entry_2: '12:00:00',
        entry_3: '13:00:00'
      }]

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
          .onCall(1).resolves({ affectedRows: 1 })
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(22, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(1)

        done()
      })()
    })

    it('addTimesheetEntry should return with NOT FOUND', function (done) {
      const response = [{
        id: 22,
        employeeId: 1,
        employeeName: 'Funcionário',
        workdayId: 1,
        workday: '21/05/2018',
        entry_1: '09:00:00',
        entry_2: '12:00:00',
        entry_3: '13:00:00',
        entry_4: '18:00:00'
      }]

      const service = proxyquire('../timesheet_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
        },
        '../workday_route/workday_service': {
          getWorkdayId: sinon.stub().resolves([{ id: 11 }])
        }
      })

      Promise.coroutine(function * () {
        const affectedRows = yield service.addTimesheetEntry(22, 1, '21/05/2018', '10:00:00')
        affectedRows.should.equal(0)

        done()
      })()
    })
  })
})
