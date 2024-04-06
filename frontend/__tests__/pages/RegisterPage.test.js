import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterPage from "../../src/pages/RegisterPage";


test("Redirects to login page on successful registration", async () => {
  render(<RegisterPage />);

  // Fill in the registration form
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "password123" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("REGISTER NOW"));

  // Wait for the redirect to happen
  await waitFor(() =>
    expect(
      screen.getByText("Already have an account? Login here")
    ).toBeInTheDocument()
  );
});

test("Displays error message on invalid registration form", async () => {
  render(<RegisterPage />);

  // Fill in the registration form with invalid data
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "invalid_email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "password456" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("REGISTER NOW"));

  // Wait for the error message to be displayed
  await waitFor(() =>
    expect(screen.getByText("Passwords are not matched!")).toBeInTheDocument()
  );
});

test("Registering with a valid profile image", async () => {
  render(<RegisterPage />);

  // Fill in the registration form
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "password123" },
  });

  // Attach a valid profile image
  const file = new File(["(⌐□_□)"], "profile.png", { type: "image/png" });
  fireEvent.change(screen.getByLabelText("profileImage"), {
    target: { files: [file] },
  });

  // Submit the form
  fireEvent.click(screen.getByText("REGISTER NOW"));

  // Wait for the redirect to happen
  await waitFor(() =>
    expect(
      screen.getByText("Already have an account? Login here")
    ).toBeInTheDocument()
  );
});

test("Registering with an invalid email", async () => {
  render(<RegisterPage />);

  // Fill in the registration form with invalid data
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "invalid_email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
    target: { value: "password456" },
  });

  // Submit the form
  fireEvent.click(screen.getByText("REGISTER NOW"));

  // Wait for the error message to be displayed
  await waitFor(() =>
    expect(screen.getByText("Passwords are not matched!")).toBeInTheDocument()
  );
});
