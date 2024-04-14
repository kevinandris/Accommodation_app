import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import WishList from "../../src/pages/WishList";

test("renders correct title", () => {
  render(<WishList />);
  const titleElement = screen.getByText("Your Wish List");
  expect(titleElement).toBeInTheDocument();
});

test("renders correct number of ListingCard components", () => {
  const mockWishList = [
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
  render(<WishList />);
  mockWishList.forEach((listing) => {
    const listingCardElement = screen.getByTestId(
      `listing-card-${listing._id}`
    );
    expect(listingCardElement).toBeInTheDocument();
  });
});

test("renders Navbar component", () => {
  render(<WishList />);
  const navbarElement = screen.getByTestId("navbar");
  expect(navbarElement).toBeInTheDocument();
});

test("renders Footer component", () => {
  render(<WishList />);
  const footerElement = screen.getByTestId("footer");
  expect(footerElement).toBeInTheDocument();
});
