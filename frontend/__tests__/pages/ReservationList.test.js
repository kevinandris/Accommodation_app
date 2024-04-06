import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReservationList from "../../src/pages/ReservationList";

test("fetches and dispatches reservation list data", async () => {
  const mockData = [
    {
      listingId: {
        _id: "1",
        listingPhotoPaths: ["path1", "path2"],
        city: "City",
        province: "Province",
        country: "Country",
        category: "Category",
      },
      hostId: {
        _id: "2",
      },
      startDate: "2022-01-01",
      endDate: "2022-01-07",
      totalPrice: 100,
      booking: true,
    },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );

  const dispatchMock = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => dispatchMock,
    useSelector: () => ({
      user: { _id: "3" },
      reservationList: [],
    }),
  }));

  render(<ReservationList />);

  await waitFor(() => {
    expect(dispatchMock).toHaveBeenCalledWith(setReservationList(mockData));
  });

  global.fetch.mockRestore();
});

test("displays loader while loading reservation list data", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
  );

  jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
    useSelector: () => ({
      user: { _id: "1" },
      reservationList: [],
    }),
  }));

  render(<ReservationList />);

  expect(screen.getByTestId("loader")).toBeInTheDocument();

  global.fetch.mockRestore();
});

test("fetches and renders multiple reservations", async () => {
  const mockData = [
    {
      listingId: {
        _id: "1",
        listingPhotoPaths: ["path1", "path2"],
        city: "City",
        province: "Province",
        country: "Country",
        category: "Category",
      },
      hostId: {
        _id: "2",
      },
      startDate: "2022-01-01",
      endDate: "2022-01-07",
      totalPrice: 100,
      booking: true,
    },
    {
      listingId: {
        _id: "3",
        listingPhotoPaths: ["path3", "path4"],
        city: "City2",
        province: "Province2",
        country: "Country2",
        category: "Category2",
      },
      hostId: {
        _id: "4",
      },
      startDate: "2022-02-01",
      endDate: "2022-02-07",
      totalPrice: 200,
      booking: true,
    },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );

  jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
    useSelector: () => ({
      user: { _id: "1" },
      reservationList: [],
    }),
  }));

  render(<ReservationList />);

  await waitFor(() => {
    expect(screen.getByText("Your Reservation List")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Province")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("2022-01-07")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("City2")).toBeInTheDocument();
    expect(screen.getByText("Province2")).toBeInTheDocument();
    expect(screen.getByText("Country2")).toBeInTheDocument();
    expect(screen.getByText("Category2")).toBeInTheDocument();
    expect(screen.getByText("2022-02-01")).toBeInTheDocument();
    expect(screen.getByText("2022-02-07")).toBeInTheDocument();
    expect(screen.getByText("$200")).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});
test("displays error message when fetching fails", async () => {
  jest
    .spyOn(global, "fetch")
    .mockImplementation(() =>
      Promise.reject(new Error("Failed to fetch reservation list"))
    );

  jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
    useSelector: () => ({
      user: { _id: "1" },
      reservationList: [],
    }),
  }));

  render(<ReservationList />);

  await waitFor(() => {
    expect(
      screen.getByText("Fetching your reservation list is not successful!")
    ).toBeInTheDocument();
  });

  global.fetch.mockRestore();
});
