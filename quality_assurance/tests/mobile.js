const URL = 'http://localhost:8082/'

module.exports = {
  tags: ['mobile'],
  'A aplicação deve estar disponível no navegador': function (browser) {
    browser
      .url(URL)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('header', 1000)
      .waitForElementVisible('.navbar', 1000)
      .pause(500)
      .execute('window.scrollBy(0,250)')
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
      .execute('window.scrollBy(0,250)')
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
  }
};