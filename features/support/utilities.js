var fse = require('fs-extra');
var gv = require('./globalVariables');
var outputDir = gv.reportDir;
var screenshotDir = outputDir +'debugscreenshots/';

var utilities = function () {

    this.sleep = function (n) {
        n = n * 1000;
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }

    this.getParameterValuesForReport = function (parameterName) {
        for (i = 0; i < process.argv.length; i++) {
            if (process.argv[i].includes(parameterName)) {
                var temp = process.argv[i];
                return temp.substr(temp.indexOf('=') + 1);
            }
        }
        return "NA";
    }

    this.createSummaryText = function (outputDir) {
        var now = new Date();
        var datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
        datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

        var runDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();

        var testEndTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
        testEndTime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

        var testSummaryFile = outputDir + 'summary.txt';
        var jirResultFile = outputDir + 'jira-results.json';
        var totalTests = 0;
        var passedTests = 0;
        var failedTests = 0;
        var totalSteps = 0;
        var totalPassedSteps = 0;
        var totalFailedSteps = 0;
        var totalotherSteps = 0;
        var otherTests = 0;
        var passedJiraId = [];
        var failedJiraId = [];

        try {
            var jdata = fse.readFileSync(outputDir + "merged-output.json", 'utf8');
            var data = JSON.parse(jdata);
            
            for (var i = 0; i < data.length; i++) {

                for (var j = 0; j < data[i].elements.length; j++) {
                    totalTests = totalTests + 1;
                    var passedSteps = 0;
                    var failedSteps = 0;
                    var otherSteps = 0;

                    for (var l = 0; l < data[i].elements[j].tags.length; l++) {
                        if(data[i].elements[j].tags[l].name.includes("R2")){
                            jirId = data[i].elements[j].tags[l].name.replace("@","");
                        }
                    }

                    for (var k = 0; k < data[i].elements[j].steps.length - 1; k++) {
                        totalSteps = totalSteps + 1;
                        var stepStatus = data[i].elements[j].steps[k].result.status;
                        
                        switch (stepStatus) {
                            case "passed":
                                passedSteps = passedSteps + 1;
                                break;
                            case "failed":
                                failedSteps = failedSteps + 1;
                                break;
                            default:
                                otherSteps = otherSteps + 1;
                        }
                    }
                    if (passedSteps == 0 && failedSteps == 0) {
                        otherTests = otherTests + 1;
                    } else if (failedSteps > 0) {
                        failedTests = failedTests + 1;
                        failedJiraId.push(jirId);
                    } else {
                        passedTests = passedTests + 1;
                        passedJiraId.push(jirId);
                    }
                    totalPassedSteps = totalPassedSteps + passedSteps;
                    totalFailedSteps = totalFailedSteps + failedSteps;
                    totalotherSteps = totalotherSteps + otherSteps;
                }

            }
            var testSummary = "Test Name: UI Automation" + " \n" +
                "Date Run: " + datetime + " \n" +
                "Total Test Cases: " + totalTests + " \n" +
                "Passed Test Cases: " + passedTests + " \n" +
                "Failed Test Cases: " + failedTests + " \n" +
                "Total Test Steps: " + totalSteps + " \n" +
                "Passed Test Steps: " + totalPassedSteps + " \n" +
                "Failed Test Steps: " + totalFailedSteps + " \n" +
                "Skipped Test Steps: " + totalotherSteps;
            fse.writeFileSync(testSummaryFile, testSummary);

            // create jira result json file
            var jiraResults = {
                "passed" : passedJiraId,
                "failed" : failedJiraId,
                "skip": [],
            }

            fse.writeFileSync(jirResultFile, JSON.stringify(jiraResults), 'utf8');

        } catch (error) {
            var testSummary = "Test Name: UI Automation" + " \n" +
                "Date Run: " + datetime + " \n" +
                "Total Test Cases: " + totalTests + " \n" +
                "Passed Test Cases: " + passedTests + " \n" +
                "Failed Test Cases: " + failedTests + " \n" +
                "Total Test Steps: " + totalSteps + " \n" +
                "Passed Test Steps: " + totalPassedSteps + " \n" +
                "Failed Test Steps: " + totalFailedSteps + " \n" +
                "Skipped Test Steps: " + totalotherSteps;
            fse.writeFileSync(testSummaryFile, testSummary);

            var jiraResults = {
                "passed" : passedJiraId,
                "failed" : failedJiraId,
                "skip": [],
            }

            fse.writeFileSync(jirResultFile, jiraResults);
        }
    };

    this.capturescreenshot = function (name) {
        var writeScreenshotToFile = function (image) {
            if (!fse.existsSync(screenshotDir)) {
                fse.mkdirSync(screenshotDir);
            }
            var date = new Date();
            var timestamp = date.getTime();
            var filename = "debug_" + name + "_" + timestamp + ".png";
            var stream = fse.createWriteStream(screenshotDir + filename);
            stream.write(image);
            stream.end();
        };

        browser.takeScreenshot().then(function (png) {
            let decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
            writeScreenshotToFile(decodedImage);
        }, function (err) {
            console.log(err);
        });
    };
};

module.exports = new utilities();