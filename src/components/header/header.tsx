import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "../../images/twitter-icon.svg";
import LinkedinIcon from "../../images/linkedin-icon.svg";
import GitHubIcon from "../../images/github-icon.png";
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
              <IconButton color="inherit" aria-label="Email" href="mailto:***REMOVED***">
                <img src={MailIcon} alt="Mail icon"/>
              </IconButton>
              <IconButton color="inherit" aria-label="Linkedin"
                          href="https://www.github.com/mouzourides">
                <img src={GitHubIcon} height="28" width="30" alt="GitHub icon"/>
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
              <Link to="/">
                <ListItem button key="Home">
                  <ListItemText primary="Home"/>
                </ListItem>
              </Link>
              <Link to="/blog">
                <ListItem button key="Blog">
                  <ListItemText primary="Blog"/>
                </ListItem>
              </Link>
              <a href="https://www.github.com/mouzourides">
                <ListItem button key="GitHub">
                  <ListItemText primary="GitHub"/>
                </ListItem>
              </a>
              <a href="mailto:***REMOVED***">
                <ListItem button key="Email">
                  <ListItemText primary="Email"/>
                </ListItem>
              </a>
              <a href="https://twitter.com/Nik_Mouz">
                <ListItem button key="Twitter">
                  <ListItemText primary="Twitter"/>
                </ListItem>
              </a>
              <a href="https://www.linkedin.com/in/nikolas-mouzourides-894b45113/">
                <ListItem button key="LinkedIn">
                  <ListItemText primary="LinkedIn"/>
                </ListItem>
              </a>
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
