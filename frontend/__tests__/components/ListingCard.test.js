import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ListingCard from "../../src/components/ListingCard";

test("should navigate to correct URL on click", () => {
  const navigateMock = jest.fn();
  const { container } = render(<ListingCard navigate={navigateMock} />);
  fireEvent.click(container.firstChild);
  expect(navigateMock).toHaveBeenCalledWith(`/properties/${listingId}`);
});

test("should display correct price information when booking is false", () => {
  const price = 100;
  const { getByText } = render(<ListingCard price={price} booking={false} />);
  expect(getByText(`$${price} per night`)).toBeInTheDocument();
});

test("should move to previous slide on click", () => {
  const goToPrevSlideMock = jest.fn();
  const { container } = render(
    <ListingCard goToPrevSlide={goToPrevSlideMock} />
  );
  fireEvent.click(container.querySelector(".prev-button"));
  expect(goToPrevSlideMock).toHaveBeenCalled();
});

test("should move to next slide on click", () => {
  const goToNextSlideMock = jest.fn();
  const { container } = render(
    <ListingCard goToNextSlide={goToNextSlideMock} />
  );
  fireEvent.click(container.querySelector(".next-button"));
  expect(goToNextSlideMock).toHaveBeenCalled();
});

test("should move to next slide on click", () => {
  const goToNextSlideMock = jest.fn();
  const { container } = render(
    <ListingCard goToNextSlide={goToNextSlideMock} />
  );
  fireEvent.click(container.querySelector(".next-button"));
  expect(goToNextSlideMock).toHaveBeenCalled();
});
