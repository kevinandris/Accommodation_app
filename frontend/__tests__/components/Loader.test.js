import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Loader from "../../src/components/Loader";

test("Loader component has correct class name", () => {
  render(<Loader />);
  const loader = screen.getByTestId("loader");
  expect(loader).toHaveClass("loader");
});

test("Loader component has correct inner class name", () => {
  render(<Loader />);
  const loaderInner = screen.getByTestId("loader-inner");
  expect(loaderInner).toHaveClass("loader-inner");
});

test("Rendering Loader component with custom props", () => {
  render(<Loader customProp="custom" />);
});
