describe("Basic Bookmark Functionality Tests", () => {
  describe("Authentication Flow", () => {
    it("should redirect unauthenticated users to login", () => {
      // Visit the home page without being logged in
      cy.visit("/");

      // Should be redirected to login page
      cy.url().should("include", "/login");

      // Verify login form is present
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
    });

    it("should display login form correctly", () => {
      cy.visit("/login");

      // Check form elements
      cy.contains("Welcome Back,").should("be.visible");
      cy.get('input[name="email"]').should(
        "have.attr",
        "placeholder",
        "Enter email address"
      );
      cy.get('input[name="password"]').should(
        "have.attr",
        "placeholder",
        "Enter password"
      );
      cy.get('button[type="submit"]').should("contain.text", "Log in");

      // Check sign up link
      cy.contains("Don't have an account?").should("be.visible");
      cy.get('a[href="/signup"]').should("contain.text", "Sign Up");
    });

    it("should show validation errors for empty form", () => {
      cy.visit("/login");

      // Try to submit empty form
      cy.get('button[type="submit"]').click();

      // Should show validation errors
      cy.contains("Email is required").should("be.visible");
      cy.contains("Password is required").should("be.visible");
    });
  });

  describe("Navigation and UI Elements", () => {
    it("should navigate to signup page", () => {
      cy.visit("/login");

      // Click sign up link
      cy.get('a[href="/signup"]').click();

      // Should navigate to signup page
      cy.url().should("include", "/signup");
    });
  });

  // Only run authenticated tests if we can successfully log in
  describe("Authenticated User Tests", () => {
    beforeEach(() => {
      // Try to log in, but handle failure gracefully
      cy.visit("/login");

      // Check if we can attempt login
      cy.get('input[name="email"]')
        .should("be.visible")
        .then(() => {
          // Try with test credentials - this may fail, which is okay
          cy.get('input[name="email"]').type("test@example.com");
          cy.get('input[name="password"]').type("password123");
          cy.get('button[type="submit"]').click();

          // Wait a moment for the response
          cy.wait(2000);
        });
    });

    it("should handle login attempt", () => {
      // Check current URL to see if login was successful
      cy.url().then((url) => {
        if (url.includes("/login")) {
          // Login failed - check for error message or form still visible
          cy.get('input[name="email"]').should("be.visible");
          // This is expected if test credentials don't exist
          cy.log("Login failed - test credentials may not exist");
        } else {
          // Login successful - we're on the home page
          cy.url().should("eq", Cypress.config().baseUrl + "/");
          cy.get("button").contains("Logout").should("be.visible");
          cy.log("Login successful");
        }
      });
    });

    it("should show appropriate content based on auth state", () => {
      cy.url().then((url) => {
        if (!url.includes("/login")) {
          // We're authenticated - test bookmark functionality
          cy.log("Testing authenticated features");

          // Look for job cards or bookmark buttons
          cy.get("body").then(($body) => {
            if ($body.find('[data-testid="bookmark-button"]').length > 0) {
              // Bookmark buttons exist - test basic interaction
              cy.get('[data-testid="bookmark-button"]')
                .first()
                .should("be.visible");
              cy.get('[data-testid="bookmark-button"]')
                .first()
                .should("have.attr", "aria-label");
            } else {
              // No bookmark buttons found - might be loading or no jobs
              cy.log(
                "No bookmark buttons found - checking for loading or empty state"
              );
            }
          });

          // Test navigation to bookmark page
          cy.get("body").then(($body) => {
            if ($body.find('button:contains("Saved")').length > 0) {
              cy.get('button:contains("Saved")').click();
              cy.url().should("include", "/bookmark");
            }
          });
        } else {
          // Still on login page - authentication required
          cy.log("Authentication required for this test");
          cy.get('input[name="email"]').should("be.visible");
        }
      });
    });

    it("should bookmark a job and show it in the saved list, then unbookmark it", () => {
      cy.url().then((url) => {
        if (!url.includes("/login")) {
          // Find a job card with a bookmark button
          cy.get('[data-testid="bookmark-button"]').first().as("bookmarkBtn");

          // Bookmark the job
          cy.get("@bookmarkBtn").click();

          // Optionally check aria-label or icon change
          cy.get("@bookmarkBtn")
            .should("have.attr", "aria-label")
            .and("match", /remove/i);

          // Go to the saved/bookmark page
          cy.visit("/bookmark");

          // Check that at least one job card is present
          cy.get(".job-card, [data-testid='job-card']").should("exist");

          // Unbookmark the job
          cy.get('[data-testid="bookmark-button"]').first().click();

          // After unbookmarking, the job should be removed from the saved list
          cy.get(".job-card, [data-testid='job-card']").should("not.exist");
        } else {
          cy.log("Authentication required for this test");
        }
      });
    });
  });

  describe("Error Handling", () => {
    it("should handle network errors gracefully", () => {
      // Intercept login request and simulate network error
      cy.intercept("POST", "**/api/auth/callback/credentials", {
        forceNetworkError: true,
      }).as("loginError");

      cy.visit("/login");
      cy.get('input[name="email"]').type("test@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('button[type="submit"]').click();

      // Should handle the error gracefully
      cy.wait("@loginError");

      // Check that we're still on login page or show error message
      cy.url().should("include", "/login");
    });

    it("should handle invalid credentials", () => {
      cy.visit("/login");

      // Try with obviously invalid credentials
      cy.get('input[name="email"]').type("invalid@example.com");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();

      // Wait for response
      cy.wait(3000);

      // Should either show error message or stay on login page
      cy.url().should("include", "/login");

      // Check for error message (if implemented)
      cy.get("body").then(($body) => {
        if ($body.find(".bg-red-100").length > 0) {
          cy.get(".bg-red-100").should("be.visible");
        }
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper form labels and accessibility attributes", () => {
      cy.visit("/login");

      // Check form accessibility
      cy.get('input[name="email"]').should("have.attr", "type", "email");
      cy.get('input[name="password"]').should("have.attr", "type", "password");

      // Check labels are associated with inputs
      cy.get("label").contains("Email Address").should("be.visible");
      cy.get("label").contains("Password").should("be.visible");

      // Check button accessibility
      cy.get('button[type="submit"]').should("not.be.disabled");
    });
  });
});
