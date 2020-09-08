const cypress = require('cypress');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');

async function runTests() {
    await cypress.run({
        browser: 'chrome',
        headless: true,
    });
    const jsonReport = await merge();
    await generator.create(jsonReport);
}

runTests();
