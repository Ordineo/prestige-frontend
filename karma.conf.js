// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-coverage'),
      require('karma-coveralls'),
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-phantomjs-launcher' ),
      require('@angular/cli/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-spec-reporter'),
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['junit', 'kjhtml', 'spec', 'coverage', 'coveralls'],
    junitReporter: {
      outputDir: 'results', // results will be saved as $outputDir/$browserName.xml 
      outputFile: 'unit-tests.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile 
      suite: '', // suite will become the package name attribute in xml testsuite element 
      useBrowserName: false, // add browser name to report and classes names 
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element 
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element 
      properties: {} // key value pair of properties to add to the <properties> section of the report 
    },
    coverageReporter: {
      dir: 'coverage/',
      type: 'lcov'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
