import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Slide from "../../src/components/Slide";

test("renders correct text", () => {
  render(<Slide />);
  const textElement = screen.getByText(
    /Explore the most stunning places to stay for your holidays/i
  );
  expect(textElement).toBeInTheDocument();
});

test("renders with correct class name", () => {
  render(<Slide />);
  const slideElement = screen.getByTestId("slide");
  expect(slideElement).toHaveClass("slide");
});

test("renders without child components", () => {
  render(<Slide />);
  const slideElement = screen.getByTestId("slide");
  expect(slideElement.children.length).toBe(0);
});

test("renders with correct class name", () => {
  render(<Slide />);
  const slideElement = screen.getByTestId("slide");
  expect(slideElement).toHaveClass("slide");
});
