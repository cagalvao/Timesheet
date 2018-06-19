'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const testingUtils = require('../../utils/testing')

describe('/timesheet_routes', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('getEmployeeTimesheet', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
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

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheet(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const response = {}

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheet(req, res)
    })

    it('should return with ERROR', function (done) {
      const getTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getEmployeeTimesheet(req, res)
    })
  })

  describe('getEmployeeTimesheetByYear', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
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

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByYear(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const response = {}

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByYear(req, res)
    })

    it('should return with ERROR', function (done) {
      const getTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getEmployeeTimesheetByYear(req, res)
    })
  })

  describe('getEmployeeTimesheetByMonth', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
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

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByMonth(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const response = {}

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByMonth(req, res)
    })

    it('should return with ERROR', function (done) {
      const getTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getEmployeeTimesheetByMonth(req, res)
    })
  })

  describe('getEmployeeTimesheetByDay', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
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

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByDay(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const response = {}

      const getTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByDay(req, res)
    })

    it('should return with ERROR', function (done) {
      const getTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          getTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getEmployeeTimesheetByDay(req, res)
    })
  })

  describe('insertTimesheet', function () {
    it('should return with SUCCESS', function (done) {
      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19',
        diff: '-15:00:05',
        accDiff: '-15:00:05'
      }

      const insertTimesheet = sinon.stub().resolves(1)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          insertTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(200)
          done()
        }
      }

      route.insertTimesheet(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const insertTimesheet = sinon.stub().resolves(0)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          insertTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.insertTimesheet(req, res)
    })

    it('should return with ERROR', function (done) {
      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const insertTimesheet = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          insertTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.insertTimesheet(req, res)
    })
  })

  describe('editTimesheet', function () {
    it('should return with SUCCESS', function (done) {
      const body = {
        id: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const editTimesheet = sinon.stub().resolves(1)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          editTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(200)
          done()
        }
      }

      route.editTimesheet(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const body = {
        id: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const editTimesheet = sinon.stub().resolves(0)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          editTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.editTimesheet(req, res)
    })

    it('should return with ERROR', function (done) {
      const body = {
        id: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const editTimesheet = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          editTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.editTimesheet(req, res)
    })
  })

  // describe('addTimesheetEntry', function () {
  //   it('should return with SUCCESS', function (done) {
  //     const body = {
  //       employeeId: 1,
  //       workday: 1,
  //       entry: '10:00:00'
  //     }

  //     const addTimesheetEntry = sinon.stub().resolves(1)

  //     const route = proxyquire('../timesheet_routes', {
  //       './timesheet_service': {
  //         addTimesheetEntry
  //       }
  //     })

  //     const req = {
  //       body
  //     }

  //     const res = {
  //       sendStatus: (code) => {
  //         code.should.be.equal(200)
  //         done()
  //       }
  //     }

  //     route.addTimesheetEntry(req, res)
  //   })

  //   it('should return with NOT FOUND', function (done) {
  //     const body = {
  //       employeeId: 1,
  //       workday: 1,
  //       entry: '10:00:00'
  //     }

  //     const addTimesheetEntry = sinon.stub().resolves(0)

  //     const route = proxyquire('../timesheet_routes', {
  //       './timesheet_service': {
  //         addTimesheetEntry
  //       }
  //     })

  //     const req = {
  //       body
  //     }

  //     const res = {
  //       sendStatus: (code) => {
  //         code.should.be.equal(404)
  //         done()
  //       }
  //     }

  //     route.addTimesheetEntry(req, res)
  //   })

  //   it('should return with ERROR', function (done) {
  //     const body = {
  //       employeeId: 1,
  //       workday: 1,
  //       entry: '10:00:00'
  //     }

  //     const addTimesheetEntry = sinon.stub().rejects(Error('generic error'))

  //     const route = proxyquire('../timesheet_routes', {
  //       './timesheet_service': {
  //         addTimesheetEntry
  //       }
  //     })

  //     const req = {
  //       body
  //     }

  //     const res = {
  //       status: (code) => {
  //         code.should.be.equal(500)
  //       },
  //       send: (error) => {
  //         error.should.be.equal('generic error')
  //         done()
  //       }
  //     }

  //     route.addTimesheetEntry(req, res)
  //   })
  // })

  describe('deleteTimesheet', function () {
    it('should return with SUCCESS', function (done) {
      const body = {
        id: 22
      }

      const deleteTimesheet = sinon.stub().resolves(1)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          deleteTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(200)
          done()
        }
      }

      route.deleteTimesheet(req, res)
    })

    it('should return with NOT FOUND', function (done) {
      const body = {
        id: 22
      }

      const deleteTimesheet = sinon.stub().resolves(0)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          deleteTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.deleteTimesheet(req, res)
    })

    it('should return with ERROR', function (done) {
      const body = {
        id: 22
      }

      const deleteTimesheet = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          deleteTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.deleteTimesheet(req, res)
    })
  })
})
