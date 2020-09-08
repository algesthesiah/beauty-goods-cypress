//通用route管理接口成功判断
Cypress.Commands.add('routeResSucess', ({ matchRoute, method, alias, cb }) => {
    // 启动服务器，开始将响应路由到cy.route()，并更改网络请求的行为
    cy.server();
    // 兼容get可默认省略
    const routeParams = method ? [method, matchRoute] : [matchRoute];
    // 使用cy.route()来管理网络请求的行为。
    cy.route(...routeParams).as(alias);
    cb();
    // 断言上一步提前拦截的route返回信息
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
    cy.log('开始登录')
    cy.requestResSucess({ method: 'POST', url: loginUrl, params });
    cy.log('开始选择店铺')
    cy.selectShop(55313402, 1);
});

// 选择店铺
Cypress.Commands.add('selectShop', (kdtId, deptId) => {
    cy.requestResSucess({
        method: 'POST',
        url: 'https://mei.youzan.com/session/s/pc/exchange',
        params: { kdtId: kdtId },
    });

    cy.requestResSucess({
        method: 'POST',
        url: 'https://mei.youzan.com/session/shop/bind',
        params: {
            kdtId: kdtId,
            deptId: deptId,
            // deviceType: 3,
        },
    });

    cy.requestResSucess({
        method: 'GET',
        url: 'https://mei.youzan.com/auth/shop/select',
        params: { kdt_id: kdtId },
    });
});
