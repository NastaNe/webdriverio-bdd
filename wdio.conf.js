// const request = require('sync-request');
const path = require('path');
const stepsFolder = './features/step_definitions';
const fs = require('fs');

let steps = [];

fs.readdirSync(stepsFolder).forEach(file => {
    step = stepsFolder + '/' + file;
    steps.push(step);
});
exports.config = {

    host: "hub",
    port: 4444,
    specs: [
        './features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 10,
        //
        browserName: 'chrome',
        chromeOptions: {
            args: ['--no-sandbox','--disable-infobars', 'window-size=1920,1080']
        }
    }],
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 0,
    screenshotPath: './errorShots/',
    baseUrl: 'https://my.rozetka.com.ua',
    waitforTimeout: 100000,
    connectionRetryTimeout: 100000,
    connectionRetryCount: 1,
    framework: 'cucumber',

    reporters: ['allure', 'spec'],
    reporterOptions: {
        allure: {
            outputDir: 'allure-results',
            useCucumberStepReporter: true
        },
        json: {
            outputDir: 'json_results'
        }
    },
    cucumberOpts: {
        compiler: ["ts:ts-node/register"],
        require: steps,
        backtrace: true, // <boolean> show full backtrace for errors
        dryRun: false, // <boolean> invoke formatters without executing steps
        failFast: false, // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output
                            // format, optionally supply PATH to redirect
                            // formatter output (repeatable)
        colors: true, // <boolean> disable colors in formatter output
        snippets: true, // <boolean> hide step definition snippets for pending
                        // steps
        source: true, // <boolean> hide source uris
        profile: [], // <string[]> (name) specify the profile to use
        strict: true, // <boolean> fail if there are any undefined or pending
        // steps

        // tags: require('./teststests/tagProcessor')(process.argv),

        // <string[]> (expression) only execute the features or scenarios with
        // tags matching the expression
        timeout: 1000 * 250,     // <number> timeout for step definitions // 1 minutes
        ignoreUndefinedDefinitions: false, // <boolean> Enable this config to
                                           // treat undefined definitions as
                                           // warnings.
        keepAlive: false,
        tagExpression:'not @ignore',
    },
    mochaOpts: {
        timeout: 100000,
        ui: 'bdd',
        reporter: 'mocha-allure-reporter'
    },
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    // onPrepare: async function (config, capabilities) {
    //
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: async function (capabilities, specs) {
        let chai = require('chai');
        let options = {defaultWait: 500};
        let chaiWebdriver = require('chai-webdriverio').default;
        chai.use(chaiWebdriver(browser, options));
        global.expect = chai.expect;
        browser.windowHandleSize({width: 1920, height: 1080});
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    // beforeTest: function (test) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function () {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function () {
    // },
    afterStep: function () {
        let name = 'ERROR-chrome-' + Date.now();
        browser.saveScreenshot('./errorShots/' + name + '.png');
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterScenario: function (scenario) {
        browser.deleteCookie("OFSESSID");
        browser.deleteCookie("_crm_identity");
        browser.deleteCookie("ASESSID");
    },
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests_old are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
        let text;
        switch (result) {
            case 1: {
                text = "#### Failed \n :warning:";
                break;
            }
            case 0: {
                text = "#### Passed \n:white_check_mark:"
            }
        }
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */

    // onComplete: function (exitCode, config, capabilities) {
    // }

};
