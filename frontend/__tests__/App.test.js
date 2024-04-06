import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";

test("renders HomePage component", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId("home-page")).toBeInTheDocument();
});

test("renders LoginPage component", () => {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId("login-page")).toBeInTheDocument();
});

test("renders CreateListing component", () => {
  render(
    <MemoryRouter initialEntries={["/create-listing"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId("create-listing")).toBeInTheDocument();
});

test("renders ListingDetails component with invalid listingId", () => {
  render(
    <MemoryRouter initialEntries={["/properties/invalidId"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByTestId("listing-details-error")).toBeInTheDocument();
});
