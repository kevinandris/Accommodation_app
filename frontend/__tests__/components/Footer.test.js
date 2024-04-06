import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Footer from "../../src/components/Footer";
test("Displays correct logo image", () => {
  render(<Footer />);
  const logoImage = screen.getByAltText("logo");
  expect(logoImage).toBeInTheDocument();
  expect(logoImage.getAttribute("src")).toBe("/assets/keipy.png");
});

test("Displays correct contact information", () => {
  render(<Footer />);
  const phoneInfo = screen.getByText("+64 27 550 1019");
  const emailInfo = screen.getByText("kevinandris27@gmail.com");
  expect(phoneInfo).toBeInTheDocument();
  expect(emailInfo).toBeInTheDocument();
});

test("Displays correct more links", () => {
  render(<Footer />);
  const aboutLink = screen.getByText("About Us");
  const termsLink = screen.getByText("Terms and Condition");
  const returnLink = screen.getByText("Return and Refund Policy");
  expect(aboutLink).toBeInTheDocument();
  expect(termsLink).toBeInTheDocument();
  expect(returnLink).toBeInTheDocument();
});

test("Displays incorrect logo image", () => {
  render(<Footer />);
  const logoImage = screen.getByAltText("logo");
  expect(logoImage).toBeInTheDocument();
  expect(logoImage.getAttribute("src")).not.toBe("/assets/incorrect_logo.png");
});
