# Liri-Node-App

An app that will will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

This app takes 2 inputs from the command line. The first is the given commands, the second is anything in that certain topic (a movie for OMDB, a song for Spotify, etc.).

To work the app you will input one of the following commands:
  concert-this
  movie-this
  spotify-this-song
  do-what-it-says
  
You will follow the command with an artist or band after concert-this, a movie after movie-this, and a song after spotify-this-song.

concert-this uses the BandsInTown API and lists information for future events including venue, venue location, and date/time.
movie-this uses the OMDB API to list ratings, plot, year released, etc.
spotify-this-song uses the Spotify API to list the album, artist, and provides a link to the song as well.
do-what-it-says takes the text in the random.txt file and runs the spoty command.
