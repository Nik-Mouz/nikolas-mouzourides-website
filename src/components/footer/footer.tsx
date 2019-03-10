import * as React from "react";
import "./footer.scss"

const Footer = () => {
  return (
    <footer className="footer fixed-bottom w-100 p-3">
      nikmouz.dev © {new Date().getFullYear()}
    </footer>
  )
};

export default Footer;