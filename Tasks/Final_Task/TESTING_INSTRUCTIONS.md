# Testing Instructions

This project includes both unit tests (Jest) and end-to-end tests (Cypress) for comprehensive testing coverage.

## Prerequisites

Before running tests, ensure you have:

1. Node.js installed
2. All dependencies installed: `npm install`
3. Environment variables configured (`.env.local`)

## Unit Tests (Jest)

Unit tests test individual components and functions in isolation.

### Running Unit Tests

```bash
# Run all unit tests
npm run test:unit

# Run unit tests in watch mode
npm test

# Run unit tests with coverage
npm run test:unit -- --coverage
```

### Unit Test Files

- `__tests__/BookmarkButton.test.tsx` - Tests for bookmark button component
- `__tests__/JobCard.test.tsx` - Tests for job card component

## End-to-End Tests (Cypress)

E2E tests simulate real user interactions with the application.

### Running E2E Tests

**Important**: E2E tests require the development server to be running. The scripts below automatically start the server before running tests.

```bash
# Run E2E tests (headless mode) - runs basic tests by default
npm run test:e2e

# Open Cypress Test Runner (interactive mode)
npm run test:e2e:open

# Run all tests (unit + E2E)
npm run test:all

# Run specific test files
npm run cypress:run -- --spec "cypress/e2e/bookmark-basic.cy.ts"
npm run cypress:run -- --spec "cypress/e2e/bookmark.cy.ts"
```

### Manual Server Management (Alternative)

If you prefer to manage the server manually:

```bash
# Terminal 1: Start the development server
npm run dev

# Terminal 2: Run Cypress tests (after server is running)
npm run cypress:run

# Or open Cypress Test Runner
npm run cypress:open
```

### E2E Test Files

- `cypress/e2e/bookmark-basic.cy.ts` - Basic authentication and UI tests (runs by default)
- `cypress/e2e/bookmark.cy.ts` - Comprehensive bookmark functionality tests (requires authentication)

### Test Approach

The E2E tests are split into two files:

1. **Basic Tests** (`bookmark-basic.cy.ts`) - **Recommended to run first**

   - Tests authentication flow and login form
   - Tests basic navigation and UI elements
   - Handles authentication gracefully (works with or without valid credentials)
   - Tests error handling and accessibility
   - **Runs by default** when you use `npm run test:e2e`

2. **Comprehensive Tests** (`bookmark.cy.ts`) - **Requires valid test credentials**
   - Full bookmark functionality testing
   - Requires working authentication with test user
   - Tests complex user workflows
   - **Only run this after setting up test credentials**

## Test Categories

### Unit Tests Coverage

- ✅ Component rendering
- ✅ Props handling
- ✅ User interactions
- ✅ Default values
- ✅ Error states

### E2E Tests Coverage

- ✅ **Bookmark Toggle Interactions**
  - Basic bookmark/unbookmark functionality
  - Visual feedback verification
  - Multiple toggle operations
- ✅ **Bookmark Persistence & Navigation**
  - Data persistence across page refreshes
  - State maintenance during navigation
  - Cross-session bookmark retention
- ✅ **Bookmark List Functionality**
  - Bookmarked jobs in saved list
  - Job removal from bookmark list
  - Empty state display
  - Multiple bookmarks handling
- ✅ **Authentication-Dependent Behavior**
  - Unauthenticated user restrictions
  - Login/logout flow
  - Session management
- ✅ **Error Handling & Edge Cases**
  - Network error scenarios
  - Rapid user interactions
  - Invalid data handling
- ✅ **User Experience & Accessibility**
  - ARIA labels for screen readers
  - Keyboard accessibility
  - Loading states

## Troubleshooting

### Common Issues

#### 1. "Cypress failed to verify that your server is running"

**Solution**: Use the proper npm scripts that automatically start the server:

```bash
npm run test:e2e  # Instead of cypress run
```

#### 2. "Cannot find name 'cy'" TypeScript errors

**Solution**: Ensure Cypress TypeScript configuration is properly set up:

- `cypress/tsconfig.json` should exist
- Cypress types should be installed

#### 3. Tests failing due to authentication

**Solution**:

- Ensure test user credentials are configured
- Check that the login custom command works with your auth system
- Verify API endpoints are accessible

#### 4. Jest tests failing with JSX syntax errors

**Solution**: This should be resolved with the current configuration, but if issues persist:

- Check `jest.config.ts` configuration
- Ensure `ts-jest` is properly configured
- Verify TypeScript configuration

### Environment-Specific Issues

#### Development Environment

- Ensure `.env.local` is configured
- Check that the development server starts on `http://localhost:3000`
- Verify API endpoints are accessible

#### CI/CD Environment

- Use headless mode: `npm run test:e2e`
- Ensure proper environment variables are set
- Consider using different base URLs for different environments

## Test Data

### Mock Data

- Unit tests use mock data and functions
- E2E tests use real API data when possible
- Authentication uses test credentials

### Test User Setup

For E2E tests, you may need to:

1. Create a test user account
2. Update the login command in `cypress/support/commands.ts`
3. Configure test-specific environment variables

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm run test:unit
      - run: npm run test:e2e
```

## Performance Considerations

### Unit Tests

- Fast execution (typically < 10 seconds)
- Run frequently during development
- Suitable for TDD workflow

### E2E Tests

- Slower execution (typically 1-5 minutes)
- Run before deployments
- Resource intensive (requires full application stack)

## Best Practices

### Writing Tests

1. **Unit Tests**: Focus on component behavior and edge cases
2. **E2E Tests**: Focus on user workflows and integration points
3. **Test Data**: Use realistic but predictable test data
4. **Assertions**: Be specific and meaningful
5. **Cleanup**: Ensure tests don't affect each other

### Maintenance

1. **Regular Updates**: Keep tests updated with UI changes
2. **Selector Strategy**: Use data-testid attributes for stability
3. **Documentation**: Keep test documentation current
4. **Performance**: Monitor test execution times

## Getting Help

If you encounter issues:

1. Check this documentation first
2. Review test logs and error messages
3. Ensure all prerequisites are met
4. Check that the application runs correctly in development mode
5. Verify environment configuration

For specific test failures, examine:

- Console logs in the browser (for E2E tests)
- Jest output (for unit tests)
- Network requests in browser dev tools
- Application logs
