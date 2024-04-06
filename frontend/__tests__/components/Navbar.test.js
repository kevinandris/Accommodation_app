import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Navbar from "../../src/components/Navbar";

test("Updates search state on input change", () => {
  render(<Navbar />);
  const searchInput = screen.getByPlaceholderText("Search . . .");
  fireEvent.change(searchInput, { target: { value: "test" } });
  expect(searchInput.value).toBe("test");
});

test("Navigates to correct search page on button click", () => {
  const navigateMock = jest.fn();
  render(<Navbar />);
  const searchInput = screen.getByPlaceholderText("Search . . .");
  const searchButton = screen.getByRole("button", { name: "Search" });
  fireEvent.change(searchInput, { target: { value: "test" } });
  fireEvent.click(searchButton);
  expect(navigateMock).toHaveBeenCalledWith("/properties/search/test");
});

test("Renders logo image with correct src and alt attributes", () => {
  render(<Navbar />);
  const logoImage = screen.getByAltText("logo");
  expect(logoImage).toBeInTheDocument();
  expect(logoImage).toHaveAttribute("src", "/assets/keipy.png");
});

test("Toggles dropdown menu state on button click", () => {
  render(<Navbar />);
  const dropdownButton = screen.getByRole("button", {
    name: "Toggle Dropdown Menu",
  });
  fireEvent.click(dropdownButton);
  expect(screen.getByTestId("dropdown-menu")).toBeInTheDocument();
  fireEvent.click(dropdownButton);
  expect(screen.queryByTestId("dropdown-menu")).not.toBeInTheDocument();
});
