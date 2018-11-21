# Techstar Cloud Platform

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c4aaed48afc64b67a95d7d30ed121afb)](https://www.codacy.com/app/tortuvshin/techstar-bot?utm_source=github.com&utm_medium=referral&utm_content=techstar-inc/techstar-bot&utm_campaign=badger)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/techstar-inc/techstar-inc)

## Running

Clone the repository, then 

* `npm install` from the root folder
* `npm start` from the root folder
  * alternatively: run `node server/bin/www` 

## Project Structure

This project is split up into multiple Express application instances,
each of which handles a specific portion of the over-all web application.

The primary application is:

* [`techstar-server`](/): The root express app and the actual web server into which the other apps are mounted

## Copyright

Copyright &copy;2018 Techstar, Inc. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
