import React from "react";
import { categories, types } from "../data";
import "../styles/Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Our Top Categories</h1>
      <p>
        Surround yourself with one of the best spots in the world <br />
        Our place is located specifically close to famous beaches and nature{" "}
        <br />
        Let's create an immersive memories with your family and loved ones
        <br />
      </p>

      <div className="categories_list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={`/properties/category/${category.label}`}>
            <div className="category" key={index}>
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
