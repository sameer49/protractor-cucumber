var path = require('path');
var fs = require('fs-extra');

var specs = function () {

  this.buildSpecs = function () {
    var specToBeRun = [
      'features/featurefiles/Login/login.feature',
      'features/featurefiles/signUp.feature'

    ]
    return specToBeRun;
  }

  this.getCapabalities = function (PLATFORM, PLATFORM_NAME, BROWSER_COUNT, BROWSER_NAME, BROWSER_VERSION) {
    var capabilitiesLocal = {
      browserName: BROWSER_NAME,
      shardTestFiles: true,
      maxInstances: BROWSER_COUNT,
      acceptInsecureCerts: true,
      chromeOptions: {
       // args: ["--disable-extensions", "--no-sandbox", "--headless", "--disable-dev-shm-usage", "--window-size=1600,1000", "--disable-web-security", "--allow-running-insecure-content", "--ignore-certificate-errors", "--disable-infobars"]
        args: ["--disable-extensions", "--no-sandbox", "--disable-gpu", "--window-size=1600,1000", "--disable-web-security", "--allow-running-insecure-content", "--ignore-certificate-errors", "--disable-infobars"]
      },
      // required for plugin
      metadata: {
        browser: {
          name: 'chrome',
          version: '60'
        },
        device: 'Virtual Machine',
        platform: {
          name: 'ubuntu',
          version: '16.04'
        }
      }
    }


    var capabilitiesSuacelab = {
      "browserName": BROWSER_NAME,
      "browserVersion": BROWSER_VERSION,
      "platformName": PLATFORM_NAME,
      name: "chrome-tests",
      shardTestFiles: true,
      maxInstances: 1
    }

    if(PLATFORM=="suacelab"){
      return capabilitiesSuacelab;
    }else{
      return capabilitiesLocal;
    }
  }
}

module.exports = new specs();
