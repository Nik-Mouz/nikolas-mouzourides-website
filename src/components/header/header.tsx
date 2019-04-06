import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "../../images/menu-icon.svg";
import { Link } from "gatsby";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Divider from "@material-ui/core/es/Divider/Divider";
import SwipeableDrawer from "@material-ui/core/es/SwipeableDrawer/SwipeableDrawer";
import SocialMediaIcons from "../social-media-icons/social-media-icons";

import "./header.scss";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="header d-flex justify-content-between">
      <div className="d-flex flex-row">
        <Typography className="logo font-weight-bolder" variant="h4" color="inherit">
          <Link to="/">{props.title} </Link>
        </Typography>
        <h3 className="logo separator font-weight-bold no-display-mobile">|</h3>
        <Typography className="nav-heading pr-5 mr-3 no-display-mobile" variant="h5" color="inherit">
          <Link to="/blog">Blog</Link>
        </Typography>
      </div>
      <div className="d-flex justify-content-around">
        <div className="nav-icons no-display-mobile">
          <SocialMediaIcons/>
        </div>
        <IconButton
          className="menu-icon"
          color="inherit"
          data-acctest="mobile-menu"
          aria-label="Menu"
          onClick={() => {
          setOpen(!open);
        }}>
          <img src={MenuIcon} alt="Menu icon"/>
        </IconButton>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        data-acctest="mobile-drawer"
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
              <Divider/>
              <a href="mailto:***REMOVED***">
                <ListItem button key="Email">
                  <ListItemText primary="Email"/>
                </ListItem>
              </a>
              <a href="https://www.github.com/mouzourides" target="_blank">
                <ListItem button key="GitHub">
                  <ListItemText primary="GitHub"/>
                </ListItem>
              </a>
              <a href="https://twitter.com/Nik_Mouz" target="_blank">
                <ListItem button key="Twitter">
                  <ListItemText primary="Twitter"/>
                </ListItem>
              </a>
              <a href="https://www.linkedin.com/in/nikolas-mouzourides-894b45113/" target="_blank">
                <ListItem button key="LinkedIn">
                  <ListItemText primary="Linkedin"/>
                </ListItem>
              </a>
              <Divider/>
              <ListItem button key="Close"
                        data-acctest="drawer-close"
                        onClick={() => setOpen(false)}
              >
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
