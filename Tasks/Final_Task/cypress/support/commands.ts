/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in a user
       * @example cy.login()
       */
      login(): Chainable<void>;

      /**
       * Custom command to log out a user
       * @example cy.logout()
       */
      logout(): Chainable<void>;
    }
  }
}

// Custom command to login
Cypress.Commands.add("login", () => {
  // Use session to cache login state
  cy.session("user-session", () => {
    cy.visit("/login");

    // Wait for login form to be visible
    cy.get('input[name="email"]').should("be.visible");

    // Fill in login form with test credentials
    // Note: You'll need to replace these with actual test credentials
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Wait for successful login - should redirect to home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");

    // Verify we're logged in by checking for logout button or other authenticated elements
    cy.get("button").contains("Logout").should("be.visible");
  });
});

// Custom command to logout
Cypress.Commands.add("logout", () => {
  cy.contains("button", "Logout").click();
  cy.url().should("include", "/login");
});

// Prevent TypeScript from reading file as legacy script
export {};
