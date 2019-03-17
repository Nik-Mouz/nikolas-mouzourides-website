import React from "react";
import BlogHeroImage from "../images/blog-hero.jpg";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import BlogCard from "../components/card/card";

const SecondPage = () => (
  <Layout heroImage={<img className="hero" style={{height: 400}} src={BlogHeroImage}/>}>
    <Seo title="Blog" description="Nik Mouzourides blog"/>
    <h1 className="pb-2">Blog</h1>
    <div className="d-flex flex-row flex-wrap">
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
      <BlogCard title="Blog" description="This is a blog post about blog posts" imagePath={BlogHeroImage}/>
    </div>
  </Layout>
);

export default SecondPage;
