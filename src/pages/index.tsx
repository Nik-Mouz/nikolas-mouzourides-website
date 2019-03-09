import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import Seo from "../components/seo"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hello world</h1>
    <p>By Nikolas Mouzourides</p>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
      {/* <Image /> */}
    {/* </div> */}
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;
