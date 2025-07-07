const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
  },
});
