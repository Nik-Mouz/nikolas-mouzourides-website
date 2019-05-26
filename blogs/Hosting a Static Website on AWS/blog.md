---
path: "/blog/hosting-a-serverless-static-website-on-aws"
date: "2019-05-22"
title: "Tutorial: Hosting a Serverless Static Website on AWS"
description: "A complete tutorial on hosting a static website on AWS"
hero: "./blog-hero.jpg"
---
In my previous [blog](/blog/creating-nikmouz-dot-dev), I gave a flyby overview of how I created this website,
mainly focusing on the development side, with only a brief section on hosting. It was brief as the infrastructure was still changing
and I was still filling in gaps in my AWS knowledge. The lessons learnt whilst hosting this website is what inspired this blog! 

## Why AWS?
Before we go any further, I want you to review why you have selected AWS for your hosting platform of choice. If you want to host a serverless static website
on a platform that values ease of use and speed of set up... AWS probably isn't right for you. There are plenty of platforms that pride themselves
in getting your site up quickly and easily; [GitHub Pages](https://pages.github.com/), [Netlify](https://www.netlify.com/), 
[Google Firebase](https://firebase.google.com/) and [Heroku](https://www.heroku.com/) come to mind. These platforms are like a cake already baked and packaged, ready to plate up and consume.
They provide plenty of support, allowing you to get your website up and running with little configuration; allowing you to focus on what you do best, the coding.
AWS is more like raw ingredients, it's up to you to mix up the flour and eggs to make the cake, (I assume these are things you mix to make a cake...
I'm not much of a baker). This does mean that it takes more time to get to the point where you can enjoy your website/ cake,
however it means you have much more control, you can choose how many eggs you want and how much milk and more cake analogy stuff.
I chose AWS because it's the primary hosting tool of my company and I wanted to learn more about it.
Think about why you have chosen to host your static website on AWS, and if you can't think of a valid reason, make your life easier and 
choose a previously mentioned simpler alternative. To be clear I think AWS is amazing and incredibly powerful, it's just not the simplest and the 
quickest to get the ball rolling when standing up a serverless static website.

## Getting started
Okay great, you're still reading so you have chosen AWS as the hosting platform for your shiny new static website. 
We are going to be using the following AWS services: S3, Route 53, CloudFront and Certificate Manager.
Don't be intimidated if you aren't familiar with these services or AWS in general; I will be explaining along the way
what each of these services do, why we need them and how to configure them for your website.

## Pricing
In terms of pricing, each of the services we will be using are pretty cheap:

* S3 is free for a year with 20,000 GET, PUT, COPY, LIST and POST requests;
and past that is fractions of cent, different per region, for storage and fetching of data.
You can find the exact amount for your region [here](https://aws.amazon.com/s3/pricing/).
* Route 53 costs $0.50 per Hosted Zone;
* Certificate Manager is free for public certificates;
* CloudFront is free for the first year with 2,000,000 HTTP or HTTPS Requests each month
and past that is fractions of cent, different per region, for HTTP Methods (per 10,000) and Regional Data Transfer Out to Origin
and Internet (per GB). You can find the exact amount for your region [here](https://aws.amazon.com/cloudfront/pricing/).

My AWS bill for this website thus far has been less than a pound per month.

Let get started!

## S3
The first task is to create an S3 Bucket to contain your static website files. "Amazon Simple Storage Service (Amazon S3) is storage for the internet.
You can use Amazon S3 to store and retrieve any amount of data at any time, from anywhere on the web."

* Log into the AWS Console, select Services in the top navigation bar, (be blown away by the monstrous drop down menu
that has appeared), and select S3.
* To create a bucket, click the Create Bucket button, this will open a modal.
* Enter into the name field the domain name we want your website to be accessible from e.g. `example.com`, S3 Bucket names must be globally unique.
* Then select a region from the dropdown, you want your bucket to reside in. I personally recommend EU (Ireland) as this region is powered by renewable energy.
* Click next. Then next again. We aren't interested in configuring encryption, versioning or logs at this moment.
* Next up, untick the checkbox that says "Block all public access". By default S3 Buckets are private which is probably a good idea as a default except 
we want yours to be public so people can see your website content.
* Click Next. 
* Finally select Create Bucket.

You have yourself an S3 Bucket! Next up we want to configure your Bucket as a website.

* Open the Bucket we just created and we'll be greeted with a tabbed screen,
* Select the Properties tab.
* Click on the "Static website hosting" card and select the "Use this bucket to host a website" radio button. (Take note of the URL labeled "Endpoint", we'll need
that in a bit.)
* You then need to specify a document index, e.g. "index.html" and an error document e.g. "error.html", fill in these fields and then hit save.

Next we want to set a Bucket Policy. Buckets Policies are rules on how your S3 Bucket will be accessed. 

* Click on the Permissions tab.
* Then Bucket Policy and then copy pasta the following JSON, replacing YourBucketName with your actual Bucket name:

```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YourBucketName/*"
        }
    ]
}
```

This Policy is very simple, it allows all objects/ files in the Bucket to be accessible by everyone, which is the behaviour we want for a website.

We have now finished the configuration for your S3 Bucket, lets upload your website files.
* Click the Overview tab, 
* Select the Upload button,
* Select your files and click the Upload button.

Remember that URL I asked you to take note of? Type it into a web browser and hey presto, cake is served.
Great! Done. Time to binge Netflix. Well... actually... don't you think it would be nice to have a more memorable domain name?

## Route 53
"Amazon Route 53 provides highly available and scalable Domain Name System (DNS), domain name registration, and health-checking web services."
We are going to use it to assign a custom domain name to your S3 Bucket. Back to the monstrous Services drop down menu we go.

* Select Route 53 in the Services dropdown menu. 

If you don't already have a domain name, you can purchase one by entering your desired domain name into the "Register domain" field, and following the payment steps.
Once you've purchased the domain, you'll notice that when you visit Route 53, under DNS management you'll have an additional Hosted Zone.
If you already have a domain name, you can click on "Transfer Domain to Route 53" and work your way through the steps
to transfer your domain... or you can manage your external domain within Route 53 by creating a new Hosted Zone for your domain,
then copying all domains marked NS, (name server), and point your current DNS management tool to these name servers.
In either case, you should now have a Hosted Zone for your domain. Time to create a Record Set.

* Click Hosted Zone
* Hit the Create Record button.

This will open a side panel which asks for a Name and Type along with a few other settings. The name field will determine the subdomain, e.g. typing `www` will create
an entry for `www.example.com`, leaving it blank will create an entry for the naked `example.com`.

* Choose what subdomain you would like and enter it into the name field.
* Then select "A - IPv4 Address" from the Type dropdown menu.

An Address record or A record is a type of DNS record type that maps a hostname to an IP Address e.g. `example.com -> 93.184.216.34.`

* Hit Yes on the Alias radio button and select your S3 bucket from the Alias Target dropdown.

If it does not appear in the dropdown menu it's because your Record Set name is different to your Bucket's name.
They must be the same. An alias basically says to AWS, "I'll let you find my IP address and make sure it's always mapped to this domain name". Handy. 

Wait a few minutes and then type your fancy new domain into a web browser.
Boom. There's your website. Great! Okay now it's Netflix binging time... except... your browser says insecure next to your domain name.
Not a great look. That's because your website is being loaded over the HTTP protocol, which means your connection to the site is not encrypted. We want to use HTTPS.
Some of you may whine: "It's just a static website! You don't need HTTPS! No personal details of any kind will be transmitted over the unencrypted connection".
The truth is, you should always configure your site to use HTTPS. Why? It confirms the integrity of the website, you know that the webpage has not been tampered
with by a man-in-the-middle, which is entirely possible when connecting to an unknown WiFi network. Many modern web features such as 
service workers and progressive web applications also will simply not work unless you're using HTTPS. Let's use HTTPS.

## Certificate Manager
"AWS Certificate Manager (ACM) handles the complexity of creating and managing public SSL/TLS certificates
for your AWS based websites and applications."
You can generate a new SSL certificate or even import a pre-existing certificate. It even deals with auto renewing your certificate which saves a lot of pain.
Certificate Manager is free but limited to 1000 certificates per account... if you exceed this I will be very impressed.
We are going to use ACM to generate your SSL certificate.

* Click Certificate Manager in the Services dropdown menu.
* Click on the region dropdown in the top navigation bar and switch your region to US East (N. Virginia), I will explain why later.
* Click the Request a Certificate button
* Select the Request a Public Certificate radio button and then click the Request a Certificate button

You will then be required to add the domain names you want your SSL certificate to secure. It is important to add the fully qualified domain names
your website will sit under otherwise your web browser will freak out and display a "Your connection is not private" error message which will
definitely scare off your users. If you are unsure at this moment, add both a wildcard domain and naked domain e.g. `*.example.com` and `example.com`,
this will give you a lot of flexibility.

* Enter your domain names in the input field, adding additional domain names with the Add another name to this certificate button and then click next

Next we will be required validate that we actually own the domain name we are registering a certificate for, to stop us impersonating another site.
There are two options, DNS Validation and Email Validation, we will be selecting DNS Validation, because with your Hosted Zone already created,
it's incredibly quick and simple.

* Select the DNS Validation radio button, select the Review button.
* Give the Review button a look over to ensure you haven't misspelled your domain name then click the Confirm and Request buton
* You will now be asked to validate your domain by adding a specific CNAME Record in your DNS configuration, click the arrow to show more, click 
the Create Record in Route 53 button and then Confirm. This will automatically create this record for you. If you registered multiple domains on your certificate,
you must do this for each listed domain. 
* Select the Continue button.

From here all you have to do is wait until Amazon validates that you actually own your domain by looking for those CNAME records. This should not take too long.
Go make yourself a coffee. Once your domain has been validated, you will have successfully generated an SSL Certificate, sitting there ready to use!
You can also remove those CNAME records in Route 53 once Amazon has finished the validation process. Time to apply your SSL certificate.
Unfortunately S3 does not support HTTPS natively, in order to use HTTPS we must introduce another AWS service called CloudFront. 

## CloudFront
"Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications,
and APIs to customers globally with low latency, high transfer speeds, all within a developer-friendly environment."
We are going to use CloudFront mainly to serve the content from your S3 Bucket using the HTTPS protocol, but as a bonus using CloudFront will mean
that the performance of your website will also be drastically improved. A content delivery network is basically a large network of servers 
that are scattered across a large geographical plain meaning that wherever you are in the world, you won't be that far from a server on this network. 
Our website living on a content delivery network means when your users visit your website, their requests will not having to travel as far. Combining
this with caching results in high performance.

* Select CloudFront in the Services dropdown menu. 
* Click the Create Distribution button,
* Select the Web distribution and select the Get Started button.

You will now be greeted by a large form titled Create Distribution, a lot of these inputs can be left to the defaults.
I will go over the key ones but feel free to look at the documentation and play around.

* Enter your S3 endpoint in the Origin Domain Name input field.

If your website uses client side routing e.g. a single page application, do not select your S3 Bucket using the dropdown menu,
use the website endpoint you took note of earlier. This field is the origin from which CloudFront will obtain your website content.

* Select the Redirect HTTP to HTTPS radio button
* (Optional) Click the Customize Object Caching radio button and decrease the Maximum and Default TTL if you want to decrease the amount of time
objects are cached, (useful if you're still doing active development on your website), as the default is 24 hours.
* (Optional) Change the Price Class dropdown to "Only use US, Canada and Europe" due to it being the cheapest with still good coverage
* Input your domain names in the Alternate Domain Names input field e.g. `example.com` and `www.example.com`
* Select the custom SSL Certificate radio button and click on your generated certificate from the dropdown.

CloudFront only supports certificates generated in the US East (N. Virginia) Region which is why we selected this region when generating your certificate.

* Enter index.html in the Default Root Object default input field. Note: this is only necessary if you didn't use the website S3 endpoint in the Origin Domain Name input field.
* Hit the Create Distribution button.
* Wait ages...

CloudFront takes a long amount of time to finish deploying which makes sense, it is transferring your website files to a lot of servers on the CDN.
Make yourself another coffee or make a cake and come back to it.

* Once CloudFront has completed the deploy, visit your Hosted Zone in Route 53 and update your Record Set Alias Target via the dropdown menu
from your S3 bucket, to your CloudFront distribution.

If it is not in the dropdown menu, it is because you did not enter this Record Set name in the Alternative Domain Names input field when configuring CloudFront.
Go update this field and then try again.

* Hit Save Record Set, wait a moment and then enter your domain name into your web browser.

That's it! You've now successfully hosted a serverless static website on AWS.
Feel free to contact me on Twitter if you run into any trouble, [@nikmouz](https://twitter.com/nik_mouz).
You can finally go binge watch Netflix, I recommend BoJack Horseman.
