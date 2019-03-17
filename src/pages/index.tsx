import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import HeroImage from "../images/hero.jpg";
import BlogCard from "../components/card/card";

const IndexPage = () => (
  <>
    <Layout heroImage={<img className="hero" src={HeroImage}/>}>
      <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
      <h1>Hello world</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et convallis lorem. Morbi accumsan imperdiet augue, a vulputate libero. Ut placerat tempus ex, in egestas lacus tincidunt ut. Aliquam erat volutpat. Sed mi risus, viverra id hendrerit nec, faucibus et enim. Aliquam pulvinar nulla id ex porta commodo a nec massa. Vestibulum rutrum urna eu ante placerat pretium.
      </p>
      <h1>Recent Activity</h1>
      <div className="d-flex flex-row flex-wrap">
        <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={HeroImage}/>
        <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={HeroImage}/>
        <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={HeroImage}/>
      </div>
    </Layout>
  </>
);

export default IndexPage;
