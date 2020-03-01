// Page class for login page

var LoginPage = function() {

	this.deltaLogo = element(by.xpath("//img[contains(@alt,'Delta Air Lines')]"));
	this.userNameBox = element(by.id('userId'));
	this.passwordBox = element(by.id('password'));
	this.loginButton1 = element(by.xpath("//button[contains(@class,'login-btn')]"));
	this.loginButton2 = element(by.xpath("//button[contains(@class,'loginButton')]"));
	this.loginPgHeader = element(by.xpath("//h1[contains(text(),' Log In To Delta ')]"));
};

module.exports = new LoginPage();
