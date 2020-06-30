import { randomString, randomNum } from '@/utils/common'

describe('add-product', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/dashboard#/goods/manage/product/common/list/MAIN_MAIN')
    cy.get('.g-space-between > :nth-child(1) > div > .zent-btn-primary')
      .should('contain', '添加产品')
      .click()
    // 表单提交
    cy.get('.app-main form')
      .as('add-product-form')
      .within(() => {
        // 名称
        cy.get('input[name=title]').type(`${randomString(20)}`)
        // 新建分类
        cy.get(
          ':nth-child(3) > .zent-form__controls > :nth-child(1) > .height-30 > .ui-link--split > span'
        ).click()
      })
    cy.get('.zent-popover-wrapper > .zent-btn-primary')
      .contains('新建分类')
      .click()
    const category = randomString(6)
    cy.get(
      '.zent-pop-inner > .zent-form > .zent-form__control-group > .zent-form__controls > .zent-input-wrapper > .zent-input'
    ).type(`${category}`)
    cy.server()
    cy.route('**/createCategory*').as('createCategory')
    cy.get(
      '[style="display: flex; justify-content: flex-end;"] > .zent-btn-primary'
    ).click()
    cy.wait('@createCategory').its('responseBody.code').should('eq', 200)
    // 新建成功了没
    cy.get(
      '.tbody > :nth-child(1) > [style="width: 245px; flex: 0 1 auto;"] > .cell__child-container'
    ).contains(`${category}`)
    cy.get('.zent-dialog-r-close').click()
    // 选择分类
    cy.get('.height-30 > .zent-popover-wrapper > .zent-select-text').click()
    cy.get('.zent-select-popup > :nth-child(1)').click()
    // 标签
    cy.get('.zent-select-tags').click()
    cy.get('.zent-select-option').click()
    // 图片
    // 监听路由
    cy.server()
    cy.route('**/search_with_page_4_pc*').as('getImgList')
    cy.get('.rc-upload-trigger').click()
    cy.wait('@getImgList').its('responseBody.code').should('eq', 0)
    cy.get(':nth-child(1) > .image-box').click()
    // 图片确认
    cy.get('.center > .zent-btn-primary').click()
    // 售价
    cy.get(
      ':nth-child(12) > .zent-form__controls > .zent-input-wrapper > .zent-input'
    ).type(`${randomNum(100, 1000)}`)
    cy.get(
      ':nth-child(2) > .zent-form__control-group > .zent-form__controls > .zent-input-wrapper > .zent-input'
    ).type(`${randomNum(1, 10)}`)
    // 提交表单
    cy.get('.zent-btn-primary').click()
    // 校验表单提交成功
    cy.get('.zent-btn-primary').should('contain', '保存')
  })
  it('添加一个商品并保存', function () {
    cy.server()
    cy.route('POST', '**/createProductForSeller*').as('createProductForSeller')
    cy.log('点击保存按钮')
    cy.get('.zent-btn-primary').click()
    cy.wait('@createProductForSeller')
      .its('responseBody.code')
      .should('eq', 200)
    cy.url().should('include', '/service/common/list/MAIN_MAIN')
  })
  it('添加一个商品并上架', function () {
    cy.server()
    cy.route('POST', '**/createProductForSeller*').as('createProductForSeller')
    cy.route('POST', '**/setItemShelveStatus*').as('setItemShelveStatus')
    cy.get('.zent-affix > :nth-child(3)').click()
    cy.wait('@createProductForSeller')
      .its('responseBody.code')
      .should('eq', 200)
    cy.wait('@setItemShelveStatus')
      .its('responseBody.code')
      .should('eq', 200)
    cy.url().should('include', '/service/common/list/MAIN_MAIN')
  })
})
