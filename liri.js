
require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require("moment");



var searchCommand = process.argv[2];
var searchSpecific = process.argv.slice(3).join(" ");

    if(searchCommand === "movie-this"){
        if (searchSpecific !== ''){
            OMDB(searchSpecific);
        }else{
            let searchSpecific = "mr nobody"
            OMDB(searchSpecific)
        };
    }


    if (searchCommand === "concert-this"){
        if (searchSpecific !== '') {
            bandsInTown(searchSpecific);
        } else {
            let searchSpecific = "Metallica";
            bandsInTown(searchSpecific);
        }
    };

    if (searchCommand === "spotify-this-song"){
        if (searchSpecific !== '') {
            spotifyCommand(searchSpecific);
        } else{
            let searchSpecific = "The Sign Ace of Base";
            spotifyCommand(searchSpecific);
        }
    };

    if (searchCommand === "do-what-it-says") {
        doWhatItSays();
    };
    

    function spotifyCommand(searchSpecific){
        spotify
            .search({
                type: 'track',
                query: searchSpecific,
                limit: '2'
            })
            .then(function (response) {
                var artist = response.tracks.items[0].artists[0].name;
                var songName = response.tracks.items[0].name;
                var link = response.tracks.items[0].external_urls.spotify;
                var album = response.tracks.items[0].album.name;
                

                console.log("Artist: " + artist + "\n");
                console.log("Song Name: " + songName + "\n");
                console.log("Album: " + album + "\n");
                console.log("Link: " + link + "\n");

            })
            .catch(function (err) {
                console.log(err);
            });
}
    


    function OMDB(searchSpecific){
    axios.get("https://www.omdbapi.com/?t=" + searchSpecific + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            var responseData = response.data;
            console.log(
                "Title: " + responseData.Title + "\n",
                "Year Released: " + responseData.Year + "\n",
                "IMDB Rating: " + responseData.imdbRating + "\n",
                "Country: " + responseData.Country + "\n",
                "Language: " + responseData.Language + "\n",
                "Plot: " + responseData.Plot + "\n",
                "Actors: " + responseData.Actors
        );
        });
    }

    function bandsInTown(artist){
        axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=3291f008d7c37b3cca7b381255e1f585&date=upcoming")
        .then(function(response) {
            var responseData = response.data;
            for (var i=0; i < responseData.length; i++){
                var venueName = responseData[i].venue.name;
                var venueCity = responseData[i].venue.city;
                var venueRegion = responseData[i].venue.region;
                var date = moment(responseData[i].datetime).format('MMMM Do YYYY, h:mm:ss a');

                console.log(`Event: ${i}`);
                console.log(`Venue: ${venueName}`);
                console.log(`Location: ${venueCity} ${venueRegion}`);
                console.log(`Date: ${date}`);
            }
        })
    }

     function doWhatItSays(){
         var whatItSays = fs.readFileSync("./random.txt", "utf8").split(',');
             if (whatItSays[0] === "spotify-this-song") {
                 spotifyCommand(whatItSays[1]);
             }
         };

   

    






