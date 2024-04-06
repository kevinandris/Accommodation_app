import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ListingDetails from "../../src/pages/ListingDetails";

test("asd", () => {
  render(<ListingDetails />);
});
test("Renders listing details correctly", async () => {
  const mockListing = {
    title: "Test Listing",
    listingPhotoPaths: ["public/photo1.jpg", "public/photo2.jpg"],
    type: "Apartment",
    city: "Test City",
    province: "Test Province",
    country: "Test Country",
    guestCount: 2,
    bedroomCount: 1,
    bedCount: 1,
    bathroomCount: 1,
    creator: {
      profileImagePath: "public/profile.jpg",
      firstName: "John",
      lastName: "Doe",
    },
    description: "Test description",
    highlight: "Test highlight",
    highlightDesc: "Test highlight description",
    amenities: ["Wifi,TV"],
    price: 100,
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockListing),
      ok: true,
    })
  );

  render(<ListingDetails />);

  await waitFor(() => {
    expect(screen.getByText(mockListing.title)).toBeInTheDocument();
    expect(screen.getAllByAltText("listing photos")).toHaveLength(
      mockListing.listingPhotoPaths.length
    );
    expect(screen.getByText(mockListing.type)).toBeInTheDocument();
    expect(screen.getByText(mockListing.city)).toBeInTheDocument();
    expect(screen.getByText(mockListing.province)).toBeInTheDocument();
    expect(screen.getByText(mockListing.country)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockListing.guestCount} guest`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockListing.bedroomCount} bedroom(s)`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockListing.bedCount} bed(s)`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockListing.bathroomCount} bathroom(s)`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Hosted by ${mockListing.creator.firstName} ${mockListing.creator.lastName}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(mockListing.description)).toBeInTheDocument();
    expect(screen.getByText(mockListing.highlight)).toBeInTheDocument();
    expect(screen.getByText(mockListing.highlightDesc)).toBeInTheDocument();
    expect(screen.getAllByTestId("facility")).toHaveLength(
      mockListing.amenities.length
    );
    expect(
      screen.getByText(`$${mockListing.price} x 1 night`)
    ).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("Handles booking submission correctly", async () => {
  const mockListing = {
    creator: {
      _id: "123",
    },
    price: 100,
  };

  const mockResponse = {
    ok: true,
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    })
  );

  jest.spyOn(window, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    })
  );

  jest.spyOn(console, "log").mockImplementation(() => {});

  render(<ListingDetails />);

  fireEvent.click(screen.getByText("Submit Booking"));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3001/bookings/create",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: undefined,
          listingId: undefined,
          hostId: mockListing.creator._id,
          startDate: expect.any(String),
          endDate: expect.any(String),
          totalPrice: mockListing.price,
        }),
      })
    );

    expect(window.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/trips"),
      expect.objectContaining({
        method: "GET",
      })
    );

    expect(console.log).not.toHaveBeenCalled();
  });

  global.fetch.mockRestore();
  window.fetch.mockRestore();
  console.log.mockRestore();
});

test("Fetching listing details fails with an error response", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.reject(new Error("Failed to fetch listing details"))
    );

  render(<ListingDetails />);

  await waitFor(() => {
    expect(screen.getByText("Fetch Listing Details Fail")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("Selecting booking dates successfully updates the selected date range", async () => {
  render(<ListingDetails />);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);

  fireEvent.change(screen.getByLabelText("Start Date"), {
    target: { value: startDate.toISOString().split("T")[0] },
  });

  fireEvent.change(screen.getByLabelText("End Date"), {
    target: { value: endDate.toISOString().split("T")[0] },
  });

  await waitFor(() => {
    expect(screen.getByLabelText("Start Date").value).toBe(
      startDate.toISOString().split("T")[0]
    );
    expect(screen.getByLabelText("End Date").value).toBe(
      endDate.toISOString().split("T")[0]
    );
  });
});
