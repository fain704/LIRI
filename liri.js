
var action = process.argv[2];
var value = process.argv[3];

var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');
var client = new Twitter(keys.twitterKeys);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);
var fs = require('fs');
var params = {
    screen_name: 'fain704',
    count: 20
    }


switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong(value);
        break;
    case 'movie-this':
        movieThis(value);
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}



function myTweets() {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error){
        	console.log(error);
        } else {
            console.log('here are your last 20 tweets');
            console.log('------------------------------------------------------');
            for (var i = 0; i < tweets.length; i++){
                console.log(tweets[i]['created_at']);
                console.log(tweets[i].text);
                console.log('------------------------------------------------------');
            }
        }

    
    });
} 


// spotify this song
// 	show: artist(s), song name, a preview link of the song, and the album
// 	default "the sign" by ace of bass
function spotifyThisSong(value) {
    if (value == null) {
        value = 'the sign';
     }

  spotify
  .search({ type: 'track', query: value })
  .then(function(response) {
    console.log('------------------------------------------------------');
    console.log('Album: ',response.tracks.items[0].album.name);
    console.log('Song Name: ',response.tracks.items[0].name);
    console.log('Artist Name: ',response.tracks.items[0].artists[0].name);
    console.log('Preview Link: ',response.tracks.items[0].preview_url);
    console.log('------------------------------------------------------');
  })
  .catch(function(err) {
    console.log(err);
  });

};
   




function movieThis(value) {
    if (value == null) {
        value = 'Mr. Nobody';
    }

    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + value +'&tomatoes=true&r=json', function(error, response, body) {
        if(error){
        	console.log(error);
        } else {
            console.log('------------------------------------------------------');
            var body = JSON.parse(body);
            console.log('Movie Title: ',body.Title);
            console.log('------------------------------------------------------');
            console.log('Made in ',body.Year);
            console.log('------------------------------------------------------');
            console.log('IMDB Rating: ',body.Ratings[0].Value);
            console.log('------------------------------------------------------');
            console.log('Rotten Tomatoes Rating: ',body.Ratings[1].Value);
            console.log('------------------------------------------------------');
            console.log('Country where '+body.Title+' was produced: '+body.Country);
            console.log('------------------------------------------------------');
            console.log('Language of '+body.Title+': '+body.Language);
            console.log('------------------------------------------------------');
            console.log('Plot: ',body.Plot);
            console.log('------------------------------------------------------');
            console.log('Actors who starred in '+body.Title+': '+body.Actors);
            console.log('------------------------------------------------------');
            
        }
    });
} 


// do-what-it-says
// 	use fs to take text out of random.txt and then use it to call one of liri's commands
// 	default spotify-this-song for i want it that way
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThisSong(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                MovieThis(dataArr[1]);
            }
        }
    });
}















