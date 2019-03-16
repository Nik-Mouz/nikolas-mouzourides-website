import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import HeroImage from "../images/hero.jpg";

const IndexPage = () => (
  <>
    <Layout heroImage={<img className="hero" src={HeroImage}/>}>
      <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
      <h1>Hello world</h1>
    </Layout>
  </>
);

export default IndexPage;
