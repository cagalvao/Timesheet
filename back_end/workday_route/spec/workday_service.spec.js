'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Promise = require('bluebird')
const testingUtils = require('../../utils/testing')

require('should-sinon')

describe('/workday_service', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('listWorkdays', function () {
    it('should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11,
          workday: '21/05/2018'
        },
        {
          id: 12,
          workday: '22/05/2018'
        },
        {
          id: 13,
          workday: '23/05/2018'
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workdays = yield service.listWorkdays()
        workdays.should.deepEqual(response)

        done()
      })()
    })
  })

  describe('getWorkdayId', function () {
    it('with non existing workday should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves([])
          .onCall(1).resolves([])
          .onCall(2).resolves({ insertId: 11 })
          .onCall(3).resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workdayId = yield service.getWorkdayId('2018-01-01')
        workdayId.should.deepEqual(response[0])

        done()
      })()
    })

    it('with existing workday should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workdayId = yield service.getWorkdayId('2018-01-01')
        workdayId.should.deepEqual(response[0].id)

        done()
      })()
    })

    it('with existing workday by date should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves([])
          .onCall(1).resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workdayId = yield service.getWorkdayId('2018-01-01')
        workdayId.should.deepEqual(response[0])

        done()
      })()
    })
  })

  describe('insertWorkday', function () {
    it('with non existing workday should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves([])
          .onCall(1).resolves({ insertId: 11 })
          .onCall(2).resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workday = yield service.insertWorkday({ workday: '2018-01-01' })
        workday.should.deepEqual(response[0])

        done()
      })()
    })

    it('with existing workday should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11
        }
      ]

      const service = proxyquire('../workday_service', {
        '../utils/db': {
          query: sinon.stub()
          .onCall(0).resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const workday = yield service.insertWorkday({ workday: '2018-01-01' })
        workday.should.deepEqual(response[0])

        done()
      })()
    })
  })
})
