
var os = require('os');
var gv = require('./features/support/globalVariables');
var outputDir = gv.reportDir;
var multipleReportDir = outputDir + "/multiple/";
var specs = require('./build_specs');
var tags = require('./build_tags');
var util = require('./features/support/utilities');

var TEST_URL = util.getParameterValuesForReport("TEST_URL");
var BROWSER_COUNT = util.getParameterValuesForReport("BROWSER_COUNT");
var BROWSER_NAME = util.getParameterValuesForReport("BROWSER_NAME");
var PLATFORM = util.getParameterValuesForReport("PLATFORM");
var PLATFORM_NAME = util.getParameterValuesForReport("PLATFORM_NAME");
var BROWSER_VERSION = util.getParameterValuesForReport("BROWSER_VERSION");


exports.config = {

	// setting to launch tests directly without selenium server
	directConnect: true,

	//chromedriver path
	chromeDriver: './node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_2.37',

	// setting time outs
	getPageTimeOut: 15000,
	allScriptsTimeout: 15000,

	// setting framework
	framework: 'custom',
	frameworkPath: require.resolve('protractor-cucumber-framework'),

	// setting protractor to ignore uncaught exceptions to take care by protractor-cucumber-framework
	ignoreUncaughtExceptions: true,
	restartBrowserBetweenTests: false,

	beforeLaunch: () => {
		console.log("specs :"+specs.buildSpecs());

	},

	onPrepare: () => { },

	afterLaunch: (exitCode) => {

	},

	// plugins for protractor
	plugins: [{
		package: 'protractor-multiple-cucumber-html-reporter-plugin',
		options: {
			automaticallyGenerateReport: true,
			removeExistingJsonReportFile: true,
			jsonDir: multipleReportDir,
			reportPath: outputDir,
			saveCollectedJSON: true,
			disableLog: true,
			pageTitle: 'UI Test Automation Report',
			reportName: 'UI Test Automation Report',
			displayDuration: true,
			durationInMS: true,
			pageFooter: "",
			customData: {
				title: 'Test Run Information',
				data: []
			}
		}
	}],

	//configuration parameters
	params: {
		test: {
			"TEST_URL": "https://www.delta.com/apac/en",
		}
	},

	// browser to launch tests
	capabilities: specs.getCapabalities(PLATFORM, PLATFORM_NAME, BROWSER_COUNT, BROWSER_NAME, BROWSER_VERSION),

	// Specify Test Files
	// Define which tests should execute
	specs: specs.buildSpecs(),

	
	//Define which tests should be excluded from execution.
	exclude: [
		// 'features/temp.feature'
	],

	// Set log level and enables colors for log output
	// logLevel: 'verbose',
	logLevel: 'INFO',
	coloredLogs: true,

	// arguments to cucumber.js
	cucumberOpts: {
		includeStackTrace: false,
		require: [
			'features/support/env.js',
			'features/support/hooks.js',
			'features/step_definitions/*.js'
		],

		tags: tags.buildTags(),
		format: 'pretty',
		format: 'json:' + outputDir + 'multiple/results.json',
		profile: false,
		'no-source': true
	}

};
