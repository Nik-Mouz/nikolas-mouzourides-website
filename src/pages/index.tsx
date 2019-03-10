import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";

const IndexPage = () => (
  <Layout>
    <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
    <h1>Hello world</h1>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}> */}
    {/* <Image /> */}
    {/* </div> */}
  </Layout>
);

export default IndexPage;
