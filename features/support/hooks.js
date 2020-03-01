// Before And After hooks used while feature executes

var gv = require('./globalVariables');
var outputDir = gv.reportDir;
var screenshotDir = outputDir + 'screenshots/';
var targetJson = outputDir + 'report.html.json';
var JsonFormatter = require('cucumber').JsonFormatter;
var fse = require('fs-extra');
var reporter = require('cucumber-html-reporter');
const report = require('multiple-cucumber-html-reporter');
var { defineSupportCode } = require('cucumber');

var testURL = browser.params.test.TEST_URL;

defineSupportCode(function ({ registerHandler }) {
	registerHandler('BeforeFeatures', function () {
	});
});

defineSupportCode(function ({ registerHandler }) {
	registerHandler('BeforeFeature', function (feature, done) {
		browser.get(testURL);
		console.print("BeforeFeature");
		done();
	});
});

defineSupportCode(function ({ registerHandler }) {
	registerHandler('AfterFeatures', function () {
		console.print("AfterFeature");
		done();
	});
});

defineSupportCode(function ({ registerHandler }) {
	registerHandler('AfterFeature', function () {
		// browser.driver.quit();
	});
});

defineSupportCode(function ({ registerHandler }) {
	registerHandler('BeforeStep', function () {
		
	});
});

defineSupportCode(function ({ registerHandler }) {
	registerHandler('AfterStep', function () {

	});
});

defineSupportCode(function ({ setDefaultTimeout }) {
	setDefaultTimeout(10 * 60 * 1000);
});

defineSupportCode(function ({ After, registerListener }) {

	var now = new Date();
	var datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
	datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

	var writeScreenshotToFile = function (image) {

		if (!fse.existsSync(screenshotDir)) {
			fse.mkdirSync(screenshotDir);
		}
		var date = new Date();
		var timestamp = date.getTime();
		var filename = "error_" + timestamp + ".png";
		var stream = fse.createWriteStream(screenshotDir + filename);
		stream.write(image);
		stream.end();
	};

	After(function (scenario, done) {
		let self = this;
		if (scenario.isFailed()) {
			browser.takeScreenshot().then(function (png) {
				let decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
				writeScreenshotToFile(decodedImage);
				self.attach(decodedImage, 'image/png');
				done();
			}, function (err) {
				done(err);
			});
		} else {
			done();
		}
	});

	jsonFormatter = new JsonFormatter;
	jsonFormatter.log = function (string) {
		if (!fse.existsSync(outputDir)) {
			fse.mkdirSync(outputDir);
		}

		fse.writeFile(targetJson, string, function (err) {
			if (err) {
				console.log('Failed to save cucumber test results to json file.');
				console.log(err);
			} else {

			}
		});
	};

	registerListener(jsonFormatter);
});
