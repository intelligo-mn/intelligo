# Intelligo Platform

## Running

Clone the repository, then

* `npm install` from the root folder
* `npm start` from the root folder
  * alternatively: run `node server/bin/www`

## Project Structure

This project is split up into multiple Express application instances,
each of which handles a specific portion of the over-all web application.

The primary application is:

* [`server`](/): The root express app and the actual web server into which the other apps are mounted

## Copyright

Copyright &copy;2019 Intelligo Systems. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
