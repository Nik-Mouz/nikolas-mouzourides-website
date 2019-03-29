import IconButton from "@material-ui/core/es/IconButton/IconButton";
import * as React from "react";
import TwitterIcon from "../../images/twitter-icon.svg";
import LinkedinIcon from "../../images/linkedin-icon.svg";
import GitHubIcon from "../../images/github-icon.png";
import MailIcon from "../../images/email-icon.svg";

const SocialMediaIcons = () => (
  <>
    <IconButton color="inherit" aria-label="Email" href="mailto:***REMOVED***">
      <img src={MailIcon} alt="Mail icon"/>
    </IconButton>
    <IconButton color="inherit" aria-label="Linkedin"
                href="https://www.github.com/mouzourides" target="_blank">
      <img src={GitHubIcon} height="28" width="30" alt="GitHub icon"/>
    </IconButton>
    <IconButton color="inherit" aria-label="Twitter" href="https://twitter.com/Nik_Mouz" target="_blank">
      <img src={TwitterIcon} alt="Twitter icon"/>
    </IconButton>
    <IconButton color="inherit" aria-label="Linkedin"
                href="https://www.linkedin.com/in/nikolas-mouzourides-894b45113/" target="_blank">
      <img src={LinkedinIcon} alt="Linkedin icon"/>
    </IconButton>
  </>
);

export default SocialMediaIcons;