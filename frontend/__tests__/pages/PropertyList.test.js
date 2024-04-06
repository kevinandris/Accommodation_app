import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PropertyList from "../../src/pages/PropertyList";

test("fetches property list data successfully", async () => {
  const mockData = [
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
      json: () => Promise.resolve(mockData),
    })
  );

  render(<PropertyList />);

  await waitFor(() => {
    expect(screen.getByText("Your Property List")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("handles fetch error gracefully", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.reject(new Error("Fetch error")));

  render(<PropertyList />);

  await waitFor(() => {
    expect(
      screen.getByText("The properties cannot be fetched")
    ).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("renders empty property list", () => {
  const mockUser = {
    _id: "1",
    propertyList: [],
  };
  render(
    <Provider store={store}>
      <PropertyList />
    </Provider>
  );
  expect(screen.getByText("Your Property List")).toBeInTheDocument();
  expect(screen.getByText("No properties found")).toBeInTheDocument();
});

test("handles empty user state", () => {
  const mockUser = null;
  render(
    <Provider store={store}>
      <PropertyList />
    </Provider>
  );
  expect(screen.getByText("Your Property List")).toBeInTheDocument();
  expect(screen.getByText("No user found")).toBeInTheDocument();
});
