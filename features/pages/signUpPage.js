
var SignUpPage = function() {

	this.signUpBt = element(by.xpath("//a[normalize-space(text())='Sign Up']"));
	this.title = element(by.id("basicInfoTitle"));
};

module.exports = new SignUpPage();