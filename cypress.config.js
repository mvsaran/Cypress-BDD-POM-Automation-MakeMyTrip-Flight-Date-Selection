const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://www.makemytrip.com/",
    async setupNodeEvents(on, config) {
      // ✅ Register Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // ✅ Tell Cypress to use ESBuild bundler for .feature files
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // ✅ Reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },
    env: {
      stepDefinitions: "cypress/support/step_definitions/**/*.js",
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "MakeMyTrip Cypress BDD Report",
      embeddedScreenshots: true,
      inlineAssets: true,
    },
  },
});
