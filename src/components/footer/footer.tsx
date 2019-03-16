import * as React from "react";
import "./footer.scss"
import SocialMediaIcons from "../header/SocialMediaIcons";

const Footer = () => {
  return (
    <footer className="footer w-100 p-3">
      <div className="container text-center d-flex flex-column">
        <span>Nikolas Mouzourides © {new Date().getFullYear()}</span>
        <div>
          <SocialMediaIcons/>
        </div>
      </div>
    </footer>
  )
};

export default Footer;