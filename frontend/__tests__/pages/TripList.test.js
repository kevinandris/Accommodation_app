import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TripList from "../../src/pages/TripList";


test("fetches trip list data and renders it correctly", async () => {
  const mockTripList = [
    {
      listingId: {
        _id: "1",
        listingPhotoPaths: ["path1", "path2"],
        city: "City 1",
        province: "Province 1",
        country: "Country 1",
        category: "Category 1",
      },
      hostId: {
        _id: "host1",
      },
      startDate: "2022-01-01",
      endDate: "2022-01-05",
      totalPrice: 100,
      booking: true,
    },
    {
      listingId: {
        _id: "2",
        listingPhotoPaths: ["path3", "path4"],
        city: "City 2",
        province: "Province 2",
        country: "Country 2",
        category: "Category 2",
      },
      hostId: {
        _id: "host2",
      },
      startDate: "2022-02-01",
      endDate: "2022-02-05",
      totalPrice: 200,
      booking: false,
    },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTripList),
    })
  );

  render(<TripList />);

  await waitFor(() => {
    expect(screen.getByText("Your Trip List")).toBeInTheDocument();
    expect(screen.getByText("City 1")).toBeInTheDocument();
    expect(screen.getByText("City 2")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("handles error when fetching trip list data", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() => Promise.reject(new Error("Fetch error")));

  render(<TripList />);

  await waitFor(() => {
    expect(
      screen.getByText("Fetching your trip list is not successful!")
    ).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("fetches trip list data with an invalid userId", async () => {
  const mockUserId = "invalidUserId";
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  render(<TripList />);

  await waitFor(() => {
    expect(
      screen.getByText("Fetching your trip list is not successful!")
    ).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});

test("dispatches setTripList action with empty tripList data", async () => {
  const mockTripList = [];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockTripList),
    })
  );

  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  render(<TripList />);

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith(setTripList(mockTripList));
  });

  global.fetch.mockRestore();
});
