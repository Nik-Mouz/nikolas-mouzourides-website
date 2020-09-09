---
path: "/blog/security-http-headers"
date: "2019-11-03"
title: "Security HTTP Headers - Is your website secure?"
description: "Is your website as secure as it could be? Using securityheaders.com, you can scan your website's headers to find out!"
hero: "./blog-hero.jpg"
---
Everyone wants to be secure on the web, but security is hard. There are many ways one can exploit a website but what if I told you just by setting a few
HTTP Headers, you can reduce your attack surface area?

Scott Helme created [securityheaders.com](https://securityheaders.com) to help drive up the usage of security based headers across the web.
The tool scans a website, then displays a security report with a rating from F to A+, informing you of extra security headers you
could add to increase your sites security, what that headers does and how it can protect you. 

So naturally, having discovered this site, I entered in my website, [nikmouz.dev](https://nikmouz.dev).
For some reason, even though I haven't set any specific headers myself, I expected to at least get a middle-of-the-pack result, at least a C or D...

![before-security-headers](/security-headers-before.png)

Oh dear. Let's fix it!

## Strict Transport Security
Strict Transport Security asks for the site to be loaded over HTTPS instead of HTTP so when the site is loaded again,
your browser remembers and automatically connects over HTTPS.
The only annoyance is the initial request can come over HTTP, before the browser sees the header.

The header accepts the following values:
- max-age=\<expire-time\> -- time in seconds
- includeSubDomains (optional) -- applies the rule to subdomains
- preload (optional) -- stated intent for being added to the [HSTS preload list](https://hstspreload.org/)

I set the value of this header to `strict-transport-security: max-age=31536000; includeSubdomains`, 31536000 seconds being 1 year.
I did not include the preload parameter as all `.dev` domains are registered on the HSTS preload list by default.

## X Content Type Options
X Content Type Options indicates that MIME types e.g. text/html, application/javascript should not be changed or followed.
The header only accepts the value: `x-content-type-options: nosniff`, so that's what I set it as.

## X Frame Options
Frames/ iframes are a tool which can improve user experience, e.g. PayPal opening a frame to allow for payment. They can also
be used for malicious intent e.g. [clickjacking attacks](https://en.wikipedia.org/wiki/Clickjacking). 
Frame Options specifies rules around whether the browser should be allowed to render pages in frames, iframes, embeds or objects. 

It accepts the following values:
- deny -- disallows all iframes
- sameorigin -- only allows iframes from the same origin

I set this to `x-frame-options: deny` as I don't plan on using frames/ iframes.

## Referrer Policy
When navigating from one site to another, the Referer header, (yes spelt incorrectly haha), keeps track of where you have just been.
Referrer Policy allows for control over this header via the scheme and origin e.g. HTTP or HTTPS.

It accepts the following values:
- "" -- rules for referer header not set
- no-referrer -- disallows site url to appear in the referer header at all
- no-referrer-when-downgrade -- only allows site url in the referer header if navigated site is not over HTTP
- same-origin -- only allows site url in the referer header if same origin
- origin -- allows site url to appear in referer header, but strips away path information
- strict-origin -- same as origin but only if navigated site is not over HTTP
- origin-when-cross-origin -- same as origin but only when navigating to a non origin site
- strict-origin-when-cross-origin -- same as origin-when-cross-origin but only if navigated site is not over HTTP
- unsafe-url -- the full url is always set in the referer header

I went with `referrer-policy: no-referrer-when-downgrade` to keep off of HTTP websites.

## Feature Policy
The Feature Policy allows for control over specific features in your browser on your site e.g. autoplay, fullscreen, geolocation and microphone.

This header accepts the following format: `feature-policy: <feature> <control level>`.

For \<feature\>, there is a vast array of values which can be configured, check out [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy) to see the full list.

The \<control level\> parameter accepts the following values:
- none -- disallows the feature
- self -- feature allowed on the current page and in iframes on the origin
- src (iframe only) -- feature allowed on in the current iframe, as long as it comes frame the same origin as website
- [origin] -- a specified list of origins the feature is allowed on, space separated

I set this to: `feature-policy: vibrate 'none'; geolocation 'self'; midi 'none'; notifications 'none'; payment 'none'; vr 'none'; fullscreen 'self'; speaker 'self'; gyroscope 'none'; magnetometer 'none'; camera 'none'; microphone 'none'; sync-xhr 'self'; usb 'none'; wake-lock 'none'; picture-in-picture 'none'; autoplay 'none';`
My strategy for setting this header was to go through the feature list and set a value for each feature according to the likeliness of ever requiring the feature.

## Content Security Policy
When you load up a website, a bunch of assets is loaded behind the scenes. If the source code was tampered with by a malicious third party,
who's to say that blob of JavaScript that's getting pulled in isn't mining Bitcoin? Or stealing your data?
The Content Security Policy header protects you against this. It allows you to specify with precision where content can be loaded,
so if the source is tampered with, your browser will block loading content that isn't on the whitelist.

The header accepts the following format: \<source\> \<control level\>.

The <source> parameter accepts a large list of values, some of which include:
- default-src -- the fallback for non specified sources
- script-src -- policy for executable scripts (JS)
- style-src -- policy for styling (CSS)
- image-src -- policy for images
- frame-src -- policy for iframes/ frames

The <control level> parameter allows the following values:
- none -- blocks use of this source
- self -- allows use of source for current origin only
- unsafe-inline -- allows use of inline CSS and JS
- unsafe-eval -- allows use of `eval()` JS function
- \<url\> -- allows source from an exact URL (supports * wildcard) e.g. nikmouz.dev:*

The full list can be found [here](https://scotthelme.co.uk/content-security-policy-an-introduction/), along with more detailed information.

Warning! You do need to be careful when setting this header. As it will block assets being loaded, a mis-configured header value
could very well break your website. Before setting the Content Security Policy, 
I recommend testing it out via setting the Content Security Policy Report Only header,
this will log violations of your policy in the console of your browser instead of blocking assets. 

I decided to not set this header. I did experiment with it by using the Content Security Policy Report Only,
but I found that the [framework my website uses](https://nikmouz.dev/blog/creating-nikmouz-dot-dev/), Gatsby, relies on
inline JS and CSS in the name of performance. This is problematic when setting this header.
There is an issue raised on Github [here](https://github.com/gatsbyjs/gatsby/issues/10890). 
I did also notice there was a plugin available for Gatsby which claims to generate hashes for inline scripts and styles
which I may look at in the future.

## Conclusion
Lets do a scan site after setting these headers.

![after-security-headers](/security-headers-after.png)

Much better :)

Try out your own website and see how you score! 
Tweet at me if you end up setting any of these headers or if you think a header value could be improved.
