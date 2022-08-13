const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionAndOrigin: true,
  },
  defaultCommandTimeout: 10000,
  video: false,
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
