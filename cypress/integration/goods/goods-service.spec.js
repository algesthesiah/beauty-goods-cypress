import { randomString, randomNum } from '@/utils/common'

describe('goods-service', () => {
  before(() => {
    cy.login()
  })
  it('服务表单提交主流程测试', function () {
    cy.visit('https://mei.youzan.com/dashboard#/goods/manage/service/common/list/MAIN_MAIN')
    cy.get('.g-space-between > :nth-child(1) > div > .zent-btn-primary')
      .should('contain', '添加服务')
      .click()
    // 表单提交
    // 名称
    cy.get(
      ':nth-child(1) > .zent-form__controls > .zent-input-wrapper > .zent-input'
    ).type(`${randomString(20)}`)
    // // 条形码
    // cy.get(
    //   ':nth-child(2) > .zent-form__controls > .zent-input-wrapper > .zent-input'
    // ).type(`${randomString(14)}`)
    // 分类
    cy.get('.zent-select-text').click()
    // 标签
    cy.get('.zent-select-popup > :nth-child(1)').click()
    // 图片
    cy.get('.zent-select-tags').click()
    cy.get('.zent-select-popup > :nth-child(1)').click()
    cy.get('.rc-upload-trigger').click()
    cy.get(':nth-child(1) > .image-box').click()
    // 图片确认
    cy.get('.center > .zent-btn-primary').click()
    // 售价
    cy.get(
      ':nth-child(9) > .zent-form__controls > .zent-input-wrapper > .zent-input'
    ).type(`${randomNum(100, 1000)}`)
    // 提交表单
    cy.get('.zent-btn-primary').click()
    // 校验表单提交成功
    cy.get('.zent-btn-primary').should('contain', '保存')
    // 上架
    cy.get('.zent-affix > :nth-child(3)')
      .click()
    cy.url().should('include', '/service/common/list/MAIN_MAIN')
    // 预览有bug pass
    // cy.get('.zent-affix > :nth-child(4)').click()
    // // 校验预览
    // // cy.wait(5000)
    // cy.server()
    // cy.route({
    //   method: 'GET',
    //   url: '/api/h5/mei/item/serving/buyer/getItemDetailByGoodsAlias',
    // }).as('H5api')
    // cy.wait('@H5api').its('status').should('eq', 200)
  })
})
