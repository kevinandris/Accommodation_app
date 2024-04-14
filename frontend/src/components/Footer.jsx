import React from "react";
import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/">
          <img src="/assets/k.png" alt="logo" />
        </a>
      </div>

      <div className="footer_center">
        <h3>More Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Condition</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+64 27 550 1019</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>kevinandris27@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
