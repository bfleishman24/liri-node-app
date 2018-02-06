LIRI Bot
Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

Before You Begin
Install These Packages
npm init -y

npm init -y sets up a project with defaults, that is pretty useful for test projects or prototyping and initialize a package.json file for your project.
npm install

npm install will install all modules listed as dependencies in package.json
npm install twitter --save

Twitter
Set var Twitter = require('twitter');
npm install node-spotify-api --save

Spotify
Set var Spotify = require('node-spotify-api');
npm install request --save

Request
Set var request = require('request');
You'll use Request to grab data from the OMDB API.
npm install dotenv --save

DotEnv
Set require('dotenv').config();
You don't need to install anything, but using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

Set var fs = require('fs');
LIRI will display your latest tweets. As we do not want to display your personal account, or its keys, please make an alias account and add a few tweets to it!

Follow the format presented in these queries

node liri.js my-tweets
node liri.js spotify-this-song ''
node liri.js movie-this ''
node liri.js do-what-it-says
Instructions
What Each Command Should Do
node liri.js my-tweets

This will show your last 20 tweets and when they were created at in your terminal/bash window.
node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

Artist(s)

The song's name

A preview link of the song from Spotify

The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.