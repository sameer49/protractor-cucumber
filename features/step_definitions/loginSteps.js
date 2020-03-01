// Step definitions

var loginPg = require('../pages/loginPage.js');
var { defineSupportCode } = require('cucumber');

defineSupportCode(function ({ Given, When, Then }) {


	Given('User is on Delta Website', function (callback) {
		browser.waitForAngularEnabled(false);
		browser.sleep(500);
		browser.wait(EC.visibilityOf(loginPg.deltaLogo), 20000);
		expect(loginPg.deltaLogo.isPresent()).to.eventually.be.true.notify(callback);
	});

	Given('User click login page menu', function (callback) {
		browser.wait(EC.visibilityOf(loginPg.loginButton1), 2000);
		loginPg.loginButton1.click().then(callback);
	});

	Given('User enters username as {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
		browser.wait(EC.visibilityOf(loginPg.userNameBox), 2000);
		loginPg.userNameBox.sendKeys(stringInDoubleQuotes).then(callback);
	});

	Given('User enters password as {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
		browser.wait(EC.visibilityOf(loginPg.passwordBox), 2000);
		loginPg.passwordBox.sendKeys(stringInDoubleQuotes).then(callback);
	});

	When('User click on log in', function (callback) {
		browser.wait(EC.visibilityOf(loginPg.loginButton2), 2000);
		loginPg.loginButton2.click().then(callback);
	});

	Then('User should not be logged in', function (callback) {
		browser.wait(EC.visibilityOf(loginPg.loginPgHeader), 2000);
		expect(loginPg.loginPgHeader.isPresent()).to.eventually.be.true.notify(callback);
	});

	Then('User should be logged in', function (callback) {
		browser.wait(EC.visibilityOf(loginPg.loginPgHeader), 2000);
		expect(loginPg.loginPgHeader.isPresent()).to.eventually.be.true.notify(callback);
	});

	Then('User should display error message as {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
		//browser.wait(EC.visibilityOf(loginPg.loginErrorMsg), 2000);
		loginErrorMsg = element(by.xpath("//a[contains(text(),'" + stringInDoubleQuotes + "')]"));
		expect(loginErrorMsg.isPresent()).to.eventually.be.true.notify(callback);
	});

	Given('User is on Login Page', function (callback) {
		browser.wait(EC.visibilityOf(loginPg.loginPgHeader), 2000);
		expect(loginPg.loginPgHeader.isPresent(),'Invalid Error Msg').to.eventually.be.true.notify(callback);
	});
});
