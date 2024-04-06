import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchPage from "../../src/pages/SearchPage";


test("fetches search listings and updates state", async () => {
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

  render(<SearchPage />);

  await waitFor(() => {
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("handles errors when fetching search listings", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.reject(new Error("Failed to fetch")));

  render(<SearchPage />);

  await waitFor(() => {
    expect(screen.getByText("Fetching the list failed")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("API fetch returns 400 status", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      status: 400,
      json: () => Promise.resolve({}),
    })
  );

  render(<SearchPage />);

  await waitFor(() => {
    expect(screen.getByText("Fetching the list failed")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});
