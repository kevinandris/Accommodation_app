import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../../src/pages/LoginPage";

test("Updates email state on input change", () => {
  render(<LoginPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("Updates password state on input change", () => {
  render(<LoginPage />);
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  expect(passwordInput.value).toBe("password123");
});

test("Submitting the form with empty password", async () => {
  render(<LoginPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  const submitButton = screen.getByText("LOG IN HERE");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Login failed")).toBeInTheDocument();
  });
});

test("Submitting the form with valid credentials", async () => {
  render(<LoginPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const submitButton = screen.getByText("LOG IN HERE");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });
});
