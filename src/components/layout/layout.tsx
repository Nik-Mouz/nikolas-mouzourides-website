/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Header from "../header/header";
import Footer from "../footer/footer";

import "./layout.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: JSX.Element[]
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
      <>
        <Header title={data.site.siteMetadata.title}/>
        <main className="container mt-3">{props.children}</main>
        <Footer/>
      </>
    )}
  />
);

export default Layout;
