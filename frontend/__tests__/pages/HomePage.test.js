import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";

test("renders Navbar component", () => {
  render(<HomePage />);
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

test("renders Footer component", () => {
  render(<HomePage />);
  expect(screen.getByTestId("footer")).toBeInTheDocument();
});

test("renders Slide component", () => {
  render(<HomePage />);
  expect(screen.getByTestId("slide")).toBeInTheDocument();
});

test("checks for broken links in Navbar", () => {
  render(<HomePage />);
  const navbarLinks = screen.getAllByRole("link");
  navbarLinks.forEach((link) => {
    fireEvent.click(link);
    expect(screen.queryByText("Page Not Found")).toBeNull();
  });
});
