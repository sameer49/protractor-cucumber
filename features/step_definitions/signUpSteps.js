var signUpPg = require('../pages/signUpPage.js');
var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {

    Given('User click SignUp page menu', function (callback) {
        browser.wait(EC.visibilityOf(signUpPg.signUpBt), 2000);
        signUpPg.signUpBt.click().then(callback);
    });

    Given('User enter basic information', function (table, callback) {
        browser.wait(EC.visibilityOf(signUpPg.title), 2000);
        signUpPg.title.click();
        var title = element(by.xpath("//li[normalize-space(text())='" + table.hashes()[0].Prefix + "']"));
        title.click().then(callback);
    });
});