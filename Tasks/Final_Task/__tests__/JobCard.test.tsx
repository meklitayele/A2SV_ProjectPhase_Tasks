import { render, screen } from "@testing-library/react";
import JobCard from "../app/component/jobcard"; // adjust path if needed
import { Provider } from "react-redux";
import { store } from "../app/store";
import { SessionProvider } from "next-auth/react";

const job = {
  id: "1",
  title: "Frontend Developer",
  orgName: "Tech Corp", // Changed from 'company' to 'orgName' to match component props
  location: "Remote",
  description: "Job description",
  isBookmarked: false,
};

describe("JobCard", () => {
  it("renders job title and company name", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <JobCard {...job} /> {/* ✅ Spread props directly */}
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument(); // Use regex to handle the period and spacing
  });

  it("shows default values when job data is missing", () => {
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <JobCard
            id="empty-job"
            // Don't pass title, orgName, location, description to trigger defaults
            isBookmarked={false}
          />
        </Provider>
      </SessionProvider>
    );

    // Test that default values are shown when props are undefined
    expect(screen.getByText("Untitled Job")).toBeInTheDocument();
    expect(screen.getByText(/Unknown Org/)).toBeInTheDocument();
    expect(screen.getByText("No description provided.")).toBeInTheDocument();
    expect(screen.getByText(/Unknown/)).toBeInTheDocument();
  });
});
