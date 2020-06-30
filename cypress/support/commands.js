/**
 * @description: 通用登录
 * @param {type}
 */
Cypress.Commands.add('login', () => {
  cy.server()
  cy.route('**/newGetCountryCodeList*').as('loginPageLoaded')
  cy.visit('https://account.youzan.com/login')
  cy.wait('@loginPageLoaded').its('responseBody.code').should('eq', 0)
  cy.get('.js-tab-captcha-login').click() //点击验证码
  cy.get('.account-input > .zent-input-wrapper > .zent-input').type(
    '18980621880'
  ) //账号验证码登录
  cy.get('.account-captcha > .zent-input-wrapper > .zent-input').type('111111')
  // 监听是否登录通过
  cy.route('POST','**/register-and-login*').as('registerAndLogin')
  cy.get('.zent-btn-primary').click() //登录
  cy.log('nmb=====3')
  cy.wait('@registerAndLogin').its('responseBody.code').should('eq', 0)
  cy.log('nmb=====4')
  // 这是我的测试店铺，进入测试
  cy.get('[title="Puck专用店铺1"] > .name > .name-str').click()
  // 是否登录成功
  cy.url().should('include', 'mei.youzan.com')
  // 注入cookie后续无需ui登录
  cy.getCookies().then((res) => {
    cy.wrap(res).should('not.have.length', 0)
  })
})

Cypress.Commands.add('setToken', () => {
  cy.server()

  cy.visit('https://mei.youzan.com/dashboard#/dashboard').then((res) => {
    // if(url.include){
    //   https://account.youzan.com/login
    // }
    console.log(res)
  })
  cy.route('**/posts/**')
  // cy.url().should('include', 'mei.youzan.com/dashboard')
})
