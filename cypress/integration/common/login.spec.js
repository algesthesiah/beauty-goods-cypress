describe('登录', function () {
    it('验证码登录', function () {
        cy.visit('https://account.youzan.com/login');

        // 避开二维码登录
        cy.get('.account__container__left')
            .children()
            .then(res => {
                if (res[0].className === 'login-qrcode') {
                    cy.get('.switch-type > img').click();
                }
            });

        // 测试验证码登录
        cy.get('.js-tab-captcha-login').click(); //点击验证码
        cy.get('.account-input > .zent-input-wrapper > .zent-input').type('18980621880'); //账号验证码登录
        cy.get('.account-captcha > .zent-input-wrapper > .zent-input').type('111111');
        // 监听是否登录通过
        cy.routeResSucess({
            method: 'POST',
            matchRoute: '**/register-and-login*',
            alias: 'registerAndLogin',
            cb: () => {
                cy.get('.zent-btn-primary').click(); //登录
            },
        });

        // 这是我的测试店铺，进入测试
        cy.get('[title="Puck专用店铺1"] > .name > .name-str').click();
        // 是否登录成功
        cy.url().should('include', 'mei.youzan.com');

        cy.getCookies().then(res => {
            // 传值测试
            cy.wrap(res).should('not.have.length', 0);
        });
    });
});
