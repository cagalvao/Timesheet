const moment = require('moment')
const URL = 'http://localhost:8082/'

module.exports = {
  tags: ['desktop'],
  'A aplicação deve estar disponível no navegador': function (browser) {
    browser
      .url(URL)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('header', 1000)
      .waitForElementVisible('.navbar', 1000)
      .waitForElementVisible('footer', 1000)      
      .pause(500)
      .end();
  },
  'Deve ser possível visualizar a tabela de pontos registrados do funcionário e o saldo de horas': function (browser) {
    let balanceValue
    let balanceTableValue
    browser
      .url(URL)
      .waitForElementVisible('.table.table-striped.break', 1000)
      .waitForElementVisible('#balance-card', 1000)
      .useXpath()
      .pause(500)
      .getAttribute('//*[@id="#balance-value"]', 'textContent', function ({ value }) {
        balanceValue = value
      })
      .getAttribute('//*[@id="posts"]/div/div/div[1]/div/div[2]/table/tbody/tr[1]/td[7]', 'textContent', function ({ value }) {
        balanceTableValue = value
      })
      .useCss()
      if (balanceTableValue === balanceValue) {
        browser.end();
      }
  },
  'Deve ser possível visualizar o saldo de horas com fundo verde, quando é positivo': function (browser) {
    browser
      .url(URL)
      .waitForElementVisible('.card.text-center.text-white.p-3.mb-3.bg-success', 1000)
      .useXpath()
      .pause(500)
      .getAttribute('//*[@id="#balance-value"]', 'textContent', function ({ value }) {
        browser.assert.ok(value.indexOf('-') === -1)
      })
      .useCss()
      .end();
  },
  'Deve ser possível registrar todos os pontos do dia': function (browser) {
    browser
      .useCss()
      .url(URL)
      .waitForElementVisible('body', 1000)
      .click('#entry-card')
      .pause(500)
      .click('#entry-card')
      .pause(500)
      .click('#entry-card')
      .pause(500)
      .click('#entry-card')
      .pause(500)
      .click('.table.table-striped.break')
      .pause(500)
      .useXpath()
      .assert.containsText('//*[@id="posts"]/div/div/div[1]/div/div[2]/table/tbody/tr[1]/td[1]', moment().format('DD/MM'))
      .useCss()
      .end();
  },
  'Deve ser possível visualizar o saldo de horas com fundo vermelho, quando é negativo': function (browser) {
    browser
      .url(URL)
      .waitForElementVisible('.card.text-center.text-white.p-3.mb-3.bg-danger', 5000)
      .useXpath()
      .pause(500)
      .getAttribute('//*[@id="#balance-value"]', 'textContent', function ({ value }) {
        browser.assert.ok(value.indexOf('-') > -1)
      })
      .useCss()
      .end();
  }
};