import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Listings from "../../src/components/Listings";


test("fetches listings data and updates state", async () => {
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

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockListings),
  });

  render(<Listings />);

  await waitFor(() => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });
});

test("handles error when fetching listings data", async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));

  render(<Listings />);

  await waitFor(() => {
    expect(screen.getByText("Fetching listings failed")).toBeInTheDocument();
  });
});

test("should render the correct number of categories", () => {
  const categories = [
    { label: "Category 1", icon: "icon1" },
    { label: "Category 2", icon: "icon2" },
    { label: "Category 3", icon: "icon3" },
  ];
  render(<Listings categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  expect(categoryElements).toHaveLength(categories.length);
});

test("should update the selected category on click", () => {
  const categories = [
    { label: "Category 1", icon: "icon1" },
    { label: "Category 2", icon: "icon2" },
    { label: "Category 3", icon: "icon3" },
  ];
  render(<Listings categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  fireEvent.click(categoryElements[1]);

  expect(categoryElements[1]).toHaveClass("selected");
});
