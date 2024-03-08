import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useSelector } from "react-redux";
import "../styles/Navbar.scss";

const Navbar = () => {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/keipy.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Search . . ." />
        <IconButton>
          <Search sx={{ color: variables.lightblue }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Publish my property
          </a>
        ) : (
          <a href="/login" className="host">
            Publish my property
          </a>
        )}

        <button className="navbar_right_account">
          <Menu sx={{ color: variables.lightblue }} />
          {!user ? (
            <Person sx={{ color: variables.lightblue }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
