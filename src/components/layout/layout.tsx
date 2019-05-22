import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Header from "../header/header";
import Footer from "../footer/footer";
import Img, { FluidObject } from "gatsby-image";

import "./layout.scss";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: JSX.Element[];
  heroImage?: FluidObject;
}

const Layout = (props: LayoutProps) => (
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
        <div className="h-100 d-flex justify-content-between flex-column">
          <div>
            <Header title={data.site.siteMetadata.title}/>
            {props.heroImage && <Img className="hero" imgStyle={{objectFit: "cover", objectPosition: "center" }}
                                     fadeIn={true} fluid={props.heroImage}/>}
            <main className={props.heroImage ? 'container pt-3' : 'main container'}>{props.children}</main>
          </div>
          <Footer/>
        </div>
      )}
    />
  );

export default Layout;
