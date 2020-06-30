const wp = require("@cypress/webpack-preprocessor");
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, "../..", dir);
}

module.exports = on => {
    const options = {
        webpackOptions: {
            resolve: {
                alias: {
                    "@": resolve("cypress/integration"),
                    cypress: resolve("cypress")
                }
            }
        }
    };
    on("file:preprocessor", wp(options));
};
