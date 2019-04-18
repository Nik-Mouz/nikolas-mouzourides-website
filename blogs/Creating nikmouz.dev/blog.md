---
path: "/blog/creating-nikmouz-dot-dev"
date: "2019-04-18"
title: "Creating nikmouz.dev"
description: "An overview of the history, development tools and hosting of nikmouz.dev"
hero: "./blog-hero.jpg"
---
In February 2019, Google announced to the world that they would be releasing their icy grip, allowing people to register .dev domains.
After immediately posting about it on my work's Slack channel I thought about purchasing one, I pondered what domain name I would choose and thought about resurrecting my personal website.
I was however hesitant to pull the trigger. I've heard stories of developers starting side projects, quickly snatching up a domain name for it, but never finishing them.
Becoming caught in a cycle of renewing the domain, hoping to one day find the time or passion they once had, then forgetting its existence.
I thought back to my history of attempting to create a personal website...

## History
On 25th November 2017 I created a github repository named [nikolas-mouzourides-website](https://github.com/Mouzourides/nikolas-mouzourides-website) with the intention of creating a personal website.
My first attempt was during my first months as a software developer, at the time I was working on a project building a website for [Thomas Cook](https://www.blackpepper.co.uk/projects/thomas-cook-money).
The project mainly consisted of wrangling with CSS and Gulp. I always found that playing with a side project with a similar tech stack to what I am working on 
severely increased my productivity at work, so naturally I chose to create my first version of my personal website using plain HTML, CSS built with Gulp. 
Although I learned a lot from this, I quickly found that I lacked the design skills to create a website I could be proud of, and so I abandoned the project.

The repository remained dormant... until May 27th 2018. During this time at work I was working on a React project, I'd done a little bit of work with Angularjs previous to this,
but it was my first time using React, I had lots to learn. Once again to help increase my productivity at work I revived my personal website.
I read a [blog article by Bruno Krebs](https://auth0.com/blog/developing-games-with-react-redux-and-svg-part-1/) over at Auth0 where he created a game
using React and so I had the idea that I would create my own React portfolio game, a game where the objective was to collide with the technologies I was familiar
highlighted in green text e.g. Java and avoid technologies I didn't want to work with marked in red e.g. .NET.
Through this project I learned a great deal about React, I also learnt that it is not the best framework/ library to create a game with.
Looking back I'm really glad I abandoned this idea... Once again the repository was dormant.

My track record for finishing my personal website wasn't great to say the least, yet I replaced my hesitance with optimism and pulled the trigger on purchasing the domain.
If you're reading this blog, you know that third time was the charm. My original goal for this website was simple, I wanted to try something new
and not waste the money I had spent on my new shiny domain name. I tasked myself with creating something, anything, and putting it on the web.
On 4th March 2019, nikmouz.dev was born. It was a basic website only containing the text "Hello world by Nikolas Mouzourides", however it made me happy; not because it was difficult to do, it didn't take me long,
but due to having something on the web that was my own. Having achieved this, I realised this website had the potential to be so much more.
It had my name on it. I wanted this website to better reflect my ability as a software developer, a place to tie together my interests,
a portal into my world. And so I started work on nikmouz.dev v2 with the goal of creating something that resembled an actual website
with an attempt at good UX and a blog, to yell my thoughts into the void.

## Development
I chose to create this website using Gatsby with Typescript. I had just come back from QCon London and attended a talk by [Jamund Ferguson](https://qconlondon.com/london2019/speakers/jamund-ferguson), a
developer at Paypal, about the [JAMStack](https://qconlondon.com/london2019/presentation/bringing-jamstack-enterprise).
JAM stands for Javascipt, API, Markup and essential entails creating static pages from your markup at build time, relying on both Javascript and external APIs for added functionality.
Since the build creates static assets, it can be cached and placed on a CDN for speed and high performance.
I'd never heard of the JAMStack before this talk but I had heard of [Gatsby](https://www.gatsbyjs.org/),
the static site generator, and was curious to try it out whilst playing with React's newly released Hooks feature. 
I found that I had no need for a backend and if this changed in the future, I could rely on APIs. I found myself adopting the JAMStack,
although it's terribly named, I felt it made sense in this case.

My experience with Gatsby on this project was incredibly positive. It has a large and active community with plenty of tutorials and documentation allowing for a great
development experience. It's built upon React and so it's easy to quickly build up components and create rendering and UI logic via utilising the flexibility of JSX,
(or TSX in my case). Another benefit of Gatsby is it's rich library of plugins that allow for great expansion upon its features. I was particularly impressed with:
[gatsby-plugin-react-helmet](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/), allowing for powerful SEO;
[gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) and [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/),
allowing for the creation of web pages from markdown files, which was a huge selling point to me allowing to easily move my blogs;
and finally [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/) allowing for image optimisation. It certainly lives up to its name in terms of performance and speed.

In terms of styling I chose to use Bootstrap, [Material-UI](https://material-ui.com/), SCSS. The [gatsby-plugin-sass](https://www.gatsbyjs.org/packages/gatsby-plugin-sass/) made using SCSS incredibly simple.
Material-UI has some great components that work very nicely with React and look great!
They seems to have embraced the whole CSS-in-JS movement, (all their code examples use it), I just deleted it all and implemented it in SCSS,
as God intended.

I chose Typescript just due to personal preference, I don't think I gained a huge amount of benefit having types on this particular project,
one could argue that it probably wasn't necessary but due learning Java as my first language and being an advocate of types,
I find writing Typescript much more enjoying, even if it's just pretending to be safer sometimes.

For testing I decided to try out [Cypress](https://www.cypress.io/), I've heard good things about it from co-workers. I found it had a nice DSL, being designed 
for method chaining gave it a clean appearance which I found easy to read. Cypress' test runner is extremely nice,
allowing for instant replaying of test steps, easy debugging and instant failure screenshots and video recordings of tests.
Behind Cypress is a Node.js server process which is also extremely handy for executing code that requires a higher privilege than a browser would allow.
An example of this was a test I wrote to ensure that the amount of files I had in the blogs directory of my project matched the amount of blog cards on 
the website's Blog page. This would not be possible with other testing framework that rely on injecting test code into a browser. I did find the fact
that Cypress requires certain binaries in order to run a little annoying when attempting to run tests in CI, however they do provide a
[docker image](https://hub.docker.com/r/cypress/base) with the required binaries pre-installed with a few options of versions of Node.
I did get the impression that Cypress was more suited for bigger projects as an all inclusive solution for testing Javascript projects,
rather than using two different testing frameworks for your end-to-end and unit tests.

## Hosting
The website is hosted on AWS. First I created a hosted zone in Route 53 and pointed to these DNS servers in the Google Domain console, allowing for complete
management in AWS. I generated an SSL certificate using AWS Certificate Manager, adding an entry in my hosted zone to prove I owned the domain
with the click of a button. I then created a bucket in S3 named nikmouz.dev and used Cloudfront to apply my SSL certificate
and place my website "on the edge". I had to adjust the cache expiry date settings during development to ensure my changes were applied within
a reasonable time period, (the default was 8 hours), but as development decreases I will slowly increase the cache expiry date.
In the future I think I would like to look at CloudFormation in order to create templates for my infrastructure.

I used [CircleCI](https://circleci.com/) for my continuous integration solution, which was refreshingly quick and easy to set up. The free tier is limited to one container and places your job
in a queue but I found this to be a non-issue. I used Cypress' docker image locked at Node version 10.15.3, giving me all the dependencies I needed to build
the website and run all my tests. After running my building my website, starting a server and running my tests against it, the final step was to deploy.
Due to the fact that Gatsby generated static assets, ready to be served, all I had to do was install the AWS CLI 
and deploy the static assets straight to my S3 bucket.

## Final Thoughts
So there you have it, an overview of the history, development tools, hosting of nikmouz.dev. Creating this website was a great learning
experience. I can now confidently say I'm a fan of the JAMStack in situations where SEO and performance is critical and you don't have an immediate requirement for a backend.
I certainly enjoyed how easy hosting became when all you need to do is serve static assets and I was incredibly impressed with Gatsby and its community.
If I were to start over from scratch, I think I would have a look at
[AWS Amplify](https://aws-amplify.github.io/) which Gatsby recommend in their docs as an easy all-in-one solution for hosting and continuous integration.
Although I learnt lots from hosting the site the way I did.

I hope you enjoyed my ramblings, look out for more blog post in the future! 

You can find the source code for nikmouz.dev [here](https://github.com/Mouzourides/nikolas-mouzourides-website).