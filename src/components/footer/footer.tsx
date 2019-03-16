import * as React from "react";
import "./footer.scss"

const Footer = () => {
  return (
    <footer className="footer w-100 p-3">
      <div className="container">
        <span>Nikolas Mouzourides © {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
};

export default Footer;