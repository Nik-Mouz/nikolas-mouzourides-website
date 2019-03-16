import React from "react";

import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import HeroImage from "../images/hero.jpg";

const IndexPage = () => (
  <>
    <Layout heroImage={<img className="hero" src={HeroImage}/>}>
      <Seo title="Home" description="Nikolas Mouzourides home page" keywords={[`gatsby`, `application`, `react`]}/>
      <h1>Hello world</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et convallis lorem. Morbi accumsan imperdiet augue, a vulputate libero. Ut placerat tempus ex, in egestas lacus tincidunt ut. Aliquam erat volutpat. Sed mi risus, viverra id hendrerit nec, faucibus et enim. Aliquam pulvinar nulla id ex porta commodo a nec massa. Vestibulum rutrum urna eu ante placerat pretium.

        Phasellus magna ante, porttitor dignissim justo eu, vestibulum volutpat lacus. Sed risus massa, pulvinar eget dapibus sed, molestie nec lorem. Nam varius molestie elit sed tincidunt. Ut vitae vehicula nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla ut dapibus orci. Fusce nunc ex, tempor at dui nec, vestibulum hendrerit ante. Proin consequat dolor nulla, dignissim tincidunt dolor tempor vitae. Nullam mauris arcu, faucibus pulvinar facilisis quis, egestas quis orci. Duis vel convallis elit, at cursus est. Maecenas pretium vulputate elit, sit amet semper risus egestas ut. Morbi pretium, nibh in ornare maximus, risus nunc dictum risus, ullamcorper maximus eros augue vel purus. Etiam vel elit feugiat, consequat tellus sit amet, commodo mauris. Morbi sed lacinia risus. Integer dolor nibh, commodo ac varius non, sodales ac sapien.

        Suspendisse non nisl arcu. Aliquam erat volutpat. Aliquam efficitur nec sapien non tempus. Donec id sem nec libero rutrum volutpat. Aliquam non porta est, eget iaculis turpis. Sed dapibus neque eu leo posuere ultricies. Mauris in sapien pretium erat ultricies faucibus quis vitae ante. In et consectetur dolor. Aenean bibendum ipsum mollis purus sodales, sit amet bibendum nisi auctor. Vivamus id mollis nisl, sit amet molestie nisl. Nullam sit amet metus condimentum purus placerat consequat.

        Sed egestas mattis quam quis semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam nec arcu vel libero efficitur dictum. Quisque efficitur lobortis diam, vitae tempor sapien maximus eu. Nunc vestibulum aliquam tortor. Nam luctus ante vitae volutpat fermentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

        Morbi euismod nunc id sapien accumsan porttitor. Sed et tincidunt dui, a dignissim ipsum. Quisque interdum pellentesque vestibulum. Duis suscipit, ex ultrices tincidunt ullamcorper, ante sapien pulvinar risus, eu bibendum ipsum arcu in purus. Quisque sollicitudin vehicula lorem, eu eleifend ex eleifend a. In et felis id metus porta consequat. Etiam dignissim tincidunt est id mollis. Ut imperdiet ullamcorper purus, id auctor lorem auctor ut. Sed varius quam et felis vulputate semper. Maecenas posuere nisi at vestibulum consectetur. Ut efficitur accumsan interdum.
      </p>
    </Layout>
  </>
);

export default IndexPage;
