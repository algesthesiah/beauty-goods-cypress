import { randomString, randomNum } from '@/utils/common';

describe('add-product', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.visit('https://mei.youzan.com/dashboard#/goods/manage/product/common/list/MAIN_MAIN');
        cy.get('.g-space-between > :nth-child(1) > div > .zent-btn-primary').should('contain', '添加产品').click();
        // 表单提交
        cy.get('.app-main form')
            .as('add-product-form')
            .within(() => {
                // 名称
                cy.get('input[name=title]').type(`${randomString(20)}`);
                // 新建分类
                cy.get(
                    ':nth-child(3) > .zent-form__controls > :nth-child(1) > .height-30 > .ui-link--split > span'
                ).click();
            });
        cy.get('.zent-popover-wrapper > .zent-btn-primary').contains('新建分类').click();
        const category = randomString(6);
        cy.get(
            '.zent-pop-inner > .zent-form > .zent-form__control-group > .zent-form__controls > .zent-input-wrapper > .zent-input'
        ).type(`${category}`);

        cy.routeResSucess({
            alias: 'createCategory',
            matchRoute: '**/createCategory*',
            cb: () => {
                cy.get('[style="display: flex; justify-content: flex-end;"] > .zent-btn-primary').click();
            },
        });
        // 新建成功了没
        cy.get('.tbody > :nth-child(1) > [style="width: 245px; flex: 0 1 auto;"] > .cell__child-container').contains(
            `${category}`
        );
        cy.get('.zent-dialog-r-close').click();
        // 选择分类
        cy.get('.height-30 > .zent-popover-wrapper > .zent-select-text').click();
        cy.get('.zent-select-popup > :nth-child(1)').click();
        // 标签
        cy.get('.zent-select-tags').click();
        cy.get('.zent-select-popup > :nth-child(1)').click();
        // 图片
        // 监听路由
        cy.routeResSucess({
            alias: 'getImgList',
            matchRoute: '**/search_with_page_4_pc*',
            cb: () => {
                cy.get('.rc-upload-trigger').click();
            },
        });

        cy.get(':nth-child(1) > .image-box').click();
        // 图片确认
        cy.get('.center > .zent-btn-primary').click();
        // 售价
        cy.get(':nth-child(12) > .zent-form__controls > .zent-input-wrapper > .zent-input').type(
            `${randomNum(100, 1000)}`
        );
        cy.get(
            ':nth-child(2) > .zent-form__control-group > .zent-form__controls > .zent-input-wrapper > .zent-input'
        ).type(`${randomNum(1, 10)}`);
        // 提交表单
        cy.get('.zent-btn-primary').click();
        // 校验表单提交成功
        cy.get('.zent-btn-primary').should('contain', '保存');
    });

    it('添加一个商品并保存', function () {
        cy.routeResSucess({
            method: 'POST',
            matchRoute: '**/createProductForSeller*',
            alias: 'createProductForSeller',
            cb: () => {
                cy.log('点击保存按钮');
                cy.get('.zent-btn-primary').click();
            },
        });
        cy.url().should('include', '/product/common/list/MAIN_MAIN');
    });

    it('添加一个商品并上架', function () {
        cy.routeResSucess([
            {
                method: 'POST',
                matchRoute: '**/createProductForSeller*',
                alias: 'createProductForSeller',
            },
            {
                method: 'POST',
                matchRoute: '**/setItemShelveStatus*',
                alias: 'setItemShelveStatus',
                cb: () => {
                    // 点击上架
                    cy.get('.zent-affix > :nth-child(3)').click();
                },
            },
        ]);
        cy.url().should('include', '/product/common/list/MAIN_MAIN');
    });
});
