##📬 Job Listing Application with Bookmark Functionality and Testing 

A modern, full-featured job listing application built with **Next.js**, **NextAuth**, **Redux Toolkit**, and **Tailwind CSS**. Features comprehensive authentication, job browsing, and bookmark functionality with complete testing coverage.

---
##🚀 Features

1. Authentication System

2. Job Listing & Management

3. Bookmark Functionality

---

## 🛠 Tech Stack

- ⚛️ NextJS
- 🎨 TailwindCSS
- ⚛️ NextAuth
- 🧪 Jest
- 🧪 Cypress

---

## 📦 Installation and Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-listing-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with required environment variables:

   ```env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

##📷 Application Screenshots


![Homepage](./public/screenshots/homepage.png)
_Main job listing page showing available positions with bookmark buttons. Users can browse jobs and bookmark their favorites._


![Loading State](./public/screenshots/loadingstate.png)
_Loading animation displayed while fetching job data from the API._


![Saved Jobs](./public/screenshots/saved.png)
_Bookmark page showing all saved jobs. Users can view and manage their bookmarked positions._

##🧪 Testing

### **Running Tests**

#### Unit Tests (Jest)

```bash
# Run all unit tests
npm run test:unit

# Run tests in watch mode
npm test

# Run tests with coverage
npm run test:unit -- --coverage
```

#### End-to-End Tests (Cypress)

```bash
# Run E2E tests (automatically starts dev server)
npm run test:e2e

# Open Cypress Test Runner
npm run test:e2e:open

# Run all tests (unit + E2E)
npm run test:all
```

### **Test Screenshots**

#### **Jest Unit Tests Results**

![Jest Tests](./public/screenshots/jest-tests.png)
_Screenshot showing Jest unit test results with all tests passing. Includes component tests for BookmarkButton and JobCard._

#### **Cypress E2E Tests Results**

![Cypress Tests](./public/screenshots/cypress1.png)
![Cypress Tests](./public/screenshots/cypress2.png)

_Screenshot showing Cypress end-to-end test results with comprehensive bookmark functionality testing._

---

## 🔧 API Integration

### **Endpoints Used**

- **Base URL**: `https://akil-backend.onrender.com/`
- **Authentication**: JWT Bearer token in Authorization header

#### **Job Endpoints**

- `GET /opportunities/search` - Get all job listings
- `GET /opportunities/:id` - Get specific job details

#### **Bookmark Endpoints**

- `GET /bookmarks` - Get user's bookmarked jobs
- `POST /bookmarks/:eventID` - Bookmark a job (empty body)
- `DELETE /bookmarks/:eventID` - Remove bookmark
