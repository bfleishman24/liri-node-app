	// Node module imports needed to run the functions
	var fs = require("fs"); //reads and writes files
	var request = require("request");
	var keys = require("./keys.js");
	var twitter = require("twitter");
	var spotify = require("node-spotify-api");
	var liriArgument = process.argv[2];
// ---------------------------------------------------------------------------------------------------------------
var myTwitterUserName = 'fleishman24';


var params = {
    screen_name: myTwitterUserName,
    count: 20
};

// ------------------------------------------------------
//Make it so liri.js can take in one of the following commands:
// ------------------------------------------------------
// try to answer the users request
var userPick = function (userRequest, functionData) {
    // we'll use a switch or if statement
    switch (userRequest) {
        //`my-tweets`
        case 'my-tweets':
            myTweets();
            break;
        //`spotify-this-song`
        case 'spotify-this-song':
            returnSpotify(functionData);
            break;
        //`movie-this`
        case 'movie-this':
		movieThis(functionData);
            break;
        //`do-what-it-says`
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("I'm sorry, I only know responses about Ben's Tweets,Song Requests, Movie Requests & Anything Else You Tell Me to Say");
    }
};
// ---------------------------------------------------------------------------------------------------------------
// Creates a function for getting a movie name
// ------------------------------------------------------
// If the user doesn't type a movie in, the program will output data for the movie Mr. Nobody.
var movieThis = function (movieName) {
	if (movieName === undefined) {
	  movieName = 'Mr Nobody';
	}
  // Create the http request for getting movie info
	var httpRequest =
	  'http://www.omdbapi.com/?t=' +
	  movieName +
	  '&y=&plot=full&tomatoes=true&r=json&apikey=trilogy';
  
	request(httpRequest, function(error, response, body) {
	  if (!error && response.statusCode == 200) {
		var data = [];
		var jsonData = JSON.parse(body);
  
		data.push({
		  'Title of the movie: ': jsonData.Title,
		  'Year the movie came out: ': jsonData.Year,
		  'IMDB Rating of the movie: ': jsonData.imdbRating,
		  'Rotten Tomatoes Rating of the movie: ': jsonData.tomatoRating,
		  'Country where the movie was produced: ': jsonData.Country,
		  'Language of the movie: ': jsonData.Language,
		  'Plot of the movie: ': jsonData.Plot,
		  'Actors in the movie: ': jsonData.Actors,
  
		  'Rotton Tomatoes URL: ': jsonData.tomatoURL,
		});
		console.log('************');
		console.log(data);
		console.log('************');
		writeToLog('MOVIES');
		writeToLog('************');
		writeToLog(data);
		writeToLog('************');
	  }
	});
  };
	// Tweet function, uses the Twitter module to call the Twitter api
	function myTweets() {
	var client = new twitter(keys.twitter);


  // Skip a line in console
  console.log('');

  // Create a request to the Twitter API for my specific API keys (linked in from "keys.js" file)
  //client.get('search/tweets', function(error, tweets, response) {
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    
    // Check for error
    if(error) throw error;
    
    // If no error, then proceed with looping all tweets (max of 20)
    var displayTweets = ""; // Used to store tweets for log.txt
    for(var i = 0; i < tweets.length; i++){
      var currentTweet = "Tweet " + (i+1) + ": " + '\n' + tweets[i].text;

      // Display to User (done inside loop because I wanted to add more spaces between the tweets, looks nicer)
      console.log(currentTweet);
      console.log('');

      // Push to Log Variable
      displayTweets += currentTweet + '\n';
    }

    // Append to log
    fs.appendFile("log.txt", displayTweets + '\n\n', function(err) {
      if(err){
        console.log('Error in output logging: ' + err);
      }
    });

  });

}
// ------------------------------------------------------
// Creates a function for finding artist name from spotify
// ------------------------------------------------------
var getArtistNames = function(artist) {
	return artist.name;
  };
  
  //Function for finding songs on Spotify
  var returnSpotify = function (songName) {
	  var spotify = new spotify(keys.spotify);
	//If it doesn't find a song, find Ace of Base, The Sign
	if (songName === undefined) {
	  songName = 'The Sign';
	}
  
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
		console.log('Error occurred: ' + err);
		return;
	  }
  
	  var songs = data.tracks.items;
	  //var songs = data.tracks;
	  console.log(songs);
	  var songData = []; //empty array to hold data
  
	  for (var i = 0; i < songs.length; i++) {
		songData.push({
		  'artist(s)': songs[i].artists.map(getArtistNames),
		  'song name: ': songs[i].name,
		  'preview song: ': songs[i].preview_url,
		  'album: ': songs[i].album.name,
		});
	  }
	  console.log('************');
	  console.log(songData);
	  console.log('************');
	  writeToLog('SONGS');
	  writeToLog('************');
	  writeToLog(songData);
	  writeToLog('************');
	});
  };
// ------------------------------------------------------
//Creates a function for doing what we tell it to do
// ------------------------------------------------------
var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
	  console.log('************');
	  console.log(data);
	  console.log('************');
	  writeToLog('WHAT TO DO');
	  writeToLog('************');
	  writeToLog(data);
	  writeToLog('************');
	  var dataArr = data.split(',');
  
	  if (dataArr.length == 2) {
		userPick(dataArr[0], dataArr[1]);
	  } else if (dataArr.length == 1) {
		userPick(dataArr[0]);
	  }
	});
  };
  // ------------------------------------------------------
  //run this on load of js file
  // ------------------------------------------------------
  var searchThis = function(argOne, argTwo) {
	userPick(argOne, argTwo);
  };
  searchThis(process.argv[2], process.argv[3]);
  // ------------------------------------------------------
  // Creates a file of all requests
  // ------------------------------------------------------
  var writeToLog = function(data) {
	fs.appendFile('log.txt', '\r\n\r\n');
  
	fs.appendFile('log.txt', JSON.stringify(data), function(err) {
	  if (err) {
		return console.log(err);
	  }
  
	  console.log('log.txt was updated!');
	});
  };
  // ------------------------------------------------------