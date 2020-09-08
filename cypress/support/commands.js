//通用route管理接口成功判断
Cypress.Commands.add('routeResSucess', params => {
    // 启动服务器，开始将响应路由到cy.route()，并更改网络请求的行为
    cy.server();
    if (!Array.isArray(params)) {
        params = [params];
    }
    params.forEach(v => {
        const { matchRoute, method, alias, cb } = v;
        // 兼容get可默认省略
        const routeParams = method ? [method, matchRoute] : [matchRoute];
        // 使用cy.route()来管理网络请求的行为。
        cy.route(...routeParams).as(alias);
        cb && cb();
    });
    params.forEach(v => {
        const { alias } = v;
        // 断言上一步提前拦截的route返回信息
        cy.waitResSucess(alias);
    });
});

// wait通用成功断言
Cypress.Commands.add('waitResSucess', alias => {
    cy.wait(`@${alias}`).its('response.body.code').should('oneOf', [10000, 200, 0]);
});

// request通用成功断言
Cypress.Commands.add('requestResSucess', ({ method, url, params }) => {
    cy.request(method, url, params).its('body.code').should('oneOf', [10000, 200, 0]);
});

Cypress.Commands.add('login', loginType => {
    let loginUrl = 'https://account.youzan.com/api/login/by-sms.json';
    let params = {
        mobile: '18980621880',
        smsCaptcha: '666666',
        countryCode: '+86',
        autoLogin: 'true',
        ticket: 'sssss',
    };
    if (loginType == 'pwd') {
        loginUrl = 'https://account.youzan.com/api/login/by-pass-with-tencent-image.json';
        params = {
            mobile: '18980621880',
            password: 'qwe123456',
            countryCode: '+86',
            autoLogin: 'true',
            ticket: 'sssss',
        };
    }
    cy.log('开始登录');
    cy.requestResSucess({ method: 'POST', url: loginUrl, params });

    cy.log('开始选择店铺');
    cy.visit('https://www.youzan.com/v4/shop/shop-list#/');
    // 这是我的测试店铺，进入测试
    cy.get('[title="Puck专用店铺1"] > .name > .name-str').click();
    // 是否登录成功
    cy.url().should('include', 'mei.youzan.com');
});
