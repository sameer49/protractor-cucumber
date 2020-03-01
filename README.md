UI Test Automation
=================

This automation framework uses protractor and cucumber.
It allows to drive protractor tests using cucumber.
Cucumber allows writing specifications based on the behavior of the application.

# Table of contents
* **[Pre Requisites](#pre-requisites)**
* **[Writing Tests](#writing-tests)**
* **[Executing Tests](#executing-tests)**

Pre-Requisites
-------------

There are a few things needed before you can work with Protractor. Make sure you have the latest versions of the following installed:

1. **Node.js**
2. **Java Development Kit**

Protractor requires Node and the development kit is needed for the Selenium Server.

After installing node.js, Node Package Manager (npm) will also be installed. please verify installation using below commands:  

	node -v
	
  	npm -v

Writing Tests
-------------
*TBD*

Executing Tests
-------------

Clone this project into your system folder.
After cloning use below command to install the packages.

	npm install .

### Test Configurations


Refer below seciton from the conf files for various configurations
1. Parallel Execution and number of parallel browser instace
```javascript
capabilities: {
	.
	shardTestFiles: true,
	maxInstances: 4,
	.
},
```	
2. Serial Execution
```javascript
capabilities: {
	.
	shardTestFiles: false,
	maxInstances: 1,
	.
},
```	
3. Chrome browser configurations - Currently it has been configured to run as headless. Please comment/un-comment as per your requirement.
```javascript
cucumberOpts: {
	.
	chromeOptions: {
			//args: ["--disable-extensions", "--no-sandbox", "--headless", "--disable-dev-shm-usage","--window-size=1600,1000", "--disable-web-security", "--allow-running-insecure-content", "--ignore-certificate-errors", "--disable-infobars"]
			 args : [ "--disable-extensions", "--no-sandbox", "--disable-gpu", "--window-size=1600,1000", "--disable-web-security", "--allow-running-insecure-content", "--ignore-certificate-errors", "--disable-infobars" ]
	},
}
```
4. Spec files executed in test run
```javascript
specs: [
	'features/foo.feature',
	.
	.
],
```
5. Cucumber configurations - tags to be executed from spec files
```javascript
cucumberOpts: {
	.
	tags: [
		'@foo or @bar'
	],
}	
```

### Test Execution
#### Local execution (Directly from code)

First update webdriver-manager using below command

	./installpackages.sh

Then follow below steps to execute various tests.


### Test Reporting
#### Local Execution
After local test execution html report can be accessed from below location

	/reports/index.html

#### Docker Execution
After docker execution html report can be accessed from below location

	/tmp/report/index.html

Also all sorts of logs can be accessed from same location



