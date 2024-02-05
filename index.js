//https://www.sqlitetutorial.net/sqlite-autoincrement/
// include socket.io, express and sqlite libraries
var socketio = require('socket.io');
var express = require('express');
var sql = require('sqlite3').verbose()
// create express object
var exp = express();
// use it to serve pages from the web folder
exp.use(express.static('web'))
var webapp = exp.listen(process.env.PORT, function() {
  console.log("Running")
})
// initialize the scores table in database
var db = new sql.Database('HighScores.db');

// create a Scores table in the database
db.run("CREATE TABLE Scores ( playerName char(30) DEFAULT NULL, score int(11) DEFAULT 0)", (err) => {
  if (err) {
    console.log("already  scores table");
  }
})

// get socketio to listen to the webserver's connection
var io = socketio(webapp)
// Create a callback function to deal with each connection.
// The callback contains code to setup what happens whenever a named message is received
io.on('connection', function(socket) {
  // a new connection has been created i.e. a web browser has connected to the server
  console.log("connected to " + socket.id)
  socket.on('submitScore', function(data) {
    db.run('INSERT INTO Scores (playerName, score) VALUES (?,?)', [data.playerName, Number(data.score)], function(err) {
      if (!err) {
        console.log(data.playerName + " submitted " + data.score)
        io.emit('newScore', data)
      }
      else {
        // could not save to database
        console.log("Error adding " + data.score + " for " + data.playerName);
      }
    });
  })
  socket.on('getHighscores', function(data) {
    // selects all the scores and puts them in an array in descending order 
    db.all("SELECT * FROM Scores ORDER BY score DESC;", function(err, row) {
      if (!err) {
        console.log(row);
        io.emit("getHighscores", { row })
      }
      else {
        console.log("Error")
      }
    })
  });

  // note when the browser disconnects
  socket.on('disconnect', function() {
    console.log(socket.id + " disconnected")
  })
})