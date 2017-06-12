// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var jasmineReporters = require('jasmine-reporters');
var HTMLReport = require('protractor-html-reporter');
var path = require('path');
var screenshotsUtil = require('jasmine2-protractor-utils');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome',
    'maxInstances': 5
  },
  directConnect: true,
  // baseUrl: "https://portal.connectmy.car",
  baseUrl: 'http://localhost:4200/',
  // seleniumServerJar: './node_modules/webdriver-manager/selenium/selenium-server-standalone-2.53.1.jar',
  framework: 'jasmine2',
  // useAllAngular2AppRoots: true,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },

  // greyed out in connected -> require tsnode

  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  afterLaunch: function (exitCode) {
  },
  onPrepare: function () {
    browser.driver.manage().window().maximize();
    // require('ts-node').register({
    //   project: 'e2e'
    // });
    // jasmine.getEnv().addReporter(consoleReporter);
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: './e2e/testresults',
      filePrefix: 'e2e-testresults'
    }));
  },
  onComplete: function () {

    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');

      testConfig = {
        reportTitle: 'Test Execution Report',
        outputPath: './e2e/testresults/',
        screenshotPath: 'screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true
      };
      new HTMLReport().from('./e2e/testresults/e2e-testresults.xml', testConfig);
    });

  },
  plugins: [{
    path: 'node_modules/jasmine2-protractor-utils/index.js',
    disableHTMLReport: true,
    disableScreenshot: false,
    screenshotPath:'./e2e/testresults/screenshots',
    screenshotOnExpectFailure:false,
    screenshotOnSpecFailure:true,
    clearFoldersBeforeTest: true,
    htmlReportDir: './e2e/testresults/htmlReportDir'
  }]
};



  
 
  