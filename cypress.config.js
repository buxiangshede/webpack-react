const { defineConfig } = require("cypress");
const webpackConfig = require("./webpack.config.js");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
