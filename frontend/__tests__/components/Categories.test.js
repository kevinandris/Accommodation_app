import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Categories from "../../src/components/Categories";

test("Displays correct number of categories", () => {
  const categories = [
    { label: "Category 1", img: "image1.jpg", icon: "icon1" },
    { label: "Category 2", img: "image2.jpg", icon: "icon2" },
    { label: "Category 3", img: "image3.jpg", icon: "icon3" },
  ];
  render(<Categories categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  expect(categoryElements.length).toBe(3);
});

test("Displays correct category labels", () => {
  const categories = [
    { label: "Category 1", img: "image1.jpg", icon: "icon1" },
    { label: "Category 2", img: "image2.jpg", icon: "icon2" },
    { label: "Category 3", img: "image3.jpg", icon: "icon3" },
  ];
  render(<Categories categories={categories} />);

  const categoryElements = screen.getAllByTestId("category");
  expect(categoryElements[0]).toHaveTextContent("Category 1");
  expect(categoryElements[1]).toHaveTextContent("Category 2");
  expect(categoryElements[2]).toHaveTextContent("Category 3");
});

test("should display overlay on category images", () => {
  const categories = [
    { label: "Category 1", img: "image1.jpg", icon: "icon1" },
    { label: "Category 2", img: "image2.jpg", icon: "icon2" },
    { label: "Category 3", img: "image3.jpg", icon: "icon3" },
  ];
  render(<Categories categories={categories} />);

  const overlayElements = screen.getAllByTestId("overlay");
  expect(overlayElements.length).toBe(3);
});

test("should navigate to the correct category page when category link is clicked", () => {
  const categories = [
    { label: "Category 1", img: "image1.jpg", icon: "icon1" },
    { label: "Category 2", img: "image2.jpg", icon: "icon2" },
    { label: "Category 3", img: "image3.jpg", icon: "icon3" },
  ];
  render(<Categories categories={categories} />);

  const categoryLinks = screen.getAllByTestId("category-link");
  fireEvent.click(categoryLinks[0]);

  expect(mockHistoryPush).toHaveBeenCalledWith(
    "/properties/category/Category 1"
  );
});
