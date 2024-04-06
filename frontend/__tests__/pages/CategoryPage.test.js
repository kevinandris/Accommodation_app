import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CategoryPage from "../../src/pages/CategoryPage";

test("fetches listings and updates state", async () => {
  const mockListings = [
    {
      _id: "1",
      creator: "John Doe",
      listingPhotoPaths: ["path1", "path2"],
      city: "New York",
      province: "New York",
      country: "USA",
      category: "Apartment",
      type: "Rent",
      price: 1000,
      booking: false,
    },
    {
      _id: "2",
      creator: "Jane Smith",
      listingPhotoPaths: ["path3", "path4"],
      city: "Los Angeles",
      province: "California",
      country: "USA",
      category: "House",
      type: "Sale",
      price: 200000,
      booking: true,
    },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockListings),
    })
  );

  render(<CategoryPage />);

  await waitFor(() => {
    expect(screen.getByText("New York listings")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles listings")).toBeInTheDocument();
  });

  expect(screen.getAllByTestId("listing-card")).toHaveLength(2);

  global.fetch.mockRestore();
});

test("handles error when fetching listings", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.reject(new Error("Fetching listings failed"))
    );

  render(<CategoryPage />);

  await waitFor(() => {
    expect(screen.getByText("Fetching listings failed")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("renders CategoryPage component without any listings", () => {
  render(<CategoryPage />);
  expect(screen.getByText("No listings found")).toBeInTheDocument();
});

test("renders CategoryPage component with error message", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.reject(new Error("Fetching listings failed"))
    );

  render(<CategoryPage />);

  await waitFor(() => {
    expect(screen.getByText("Fetching listings failed")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});
