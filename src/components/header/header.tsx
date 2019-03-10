import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "../../images/twitter-icon.svg";
import LinkedinIcon from "../../images/linkedin-icon.svg";
import MailIcon from "../../images/email-icon.svg";
import MenuIcon from "../../images/menu-icon.svg";
import { Link } from "gatsby";
import "./header.scss";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Divider from "@material-ui/core/es/Divider/Divider";
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar className="container d-flex justify-content-between">
          <Typography className="logo font-weight-bolder font-italic" variant="h4" color="inherit">
            <Link to="/">{props.title}</Link>
          </Typography>
          <div className="d-flex justify-content-around">
            <div className="nav-icons">
              <Typography className="pt-1 pr-4" variant="h5" color="inherit">
                <Link to="/blog">Blog</Link>
              </Typography>
              <IconButton color="inherit" aria-label="Email" href="mailto:nikolas.mouzourides@gmail.com">
                <img src={MailIcon} alt="Mail icon"/>
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" href="https://twitter.com/Nik_Mouz">
                <img src={TwitterIcon} alt="Twitter icon"/>
              </IconButton>
              <IconButton color="inherit" aria-label="Linkedin"
                          href="https://www.linkedin.com/in/nikolas-mouzourides-894b45113/">
                <img src={LinkedinIcon} alt="Linkedin icon"/>
              </IconButton>
            </div>
            <IconButton className="menu-icon" color="inherit" aria-label="Menu" onClick={() => setOpen(!open)}>
              <img src={MenuIcon} alt="Menu icon"/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div
          className="drawer"
          tabIndex={0}
          role="button"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <div>
            <List>
              <ListItem button key="Home" href="/">
                <ListItemText primary="Home"/>
              </ListItem>
              <ListItem button key="Blog" href="/blog">
                <ListItemText primary="Blog"/>
              </ListItem>
              <ListItem button key="Email" href="mailto:nikolas.mouzourides@gmail.com">
                <ListItemText primary="Email"/>
              </ListItem>
              <ListItem button key="Twitter" href="https://twitter.com/Nik_Mouz">
                <ListItemText primary="Twitter"/>
              </ListItem>
              <ListItem button key="LinkedIn" href="https://www.linkedin.com/in/nikolas-mouzourides-894b45113/">
                <ListItemText primary="LinkedIn"/>
              </ListItem>
              <Divider/>
              <ListItem button key="Close" onClick={() => setOpen(false)}>
                <ListItemText primary="Close"/>
              </ListItem>
            </List>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

export default Header;
