//require necesssary dependencies
const httpserver = require("http").createServer();
const io = require("socket.io")(httpserver);
const firebase = require("firebase");
const fs = require("fs");
//require necessary classes
const Player = require("./serverClasses/player.js").Player;
const Room = require("./serverClasses/room.js").Room;
const User = require("./serverClasses/user.js").User;
const Server = require("./serverClasses/server.js").Server;
var config = fs.readFileSync("config.json");
var configJSON = JSON.parse(config);
firebase.initializeApp(configJSON);
var db = firebase.database();

//start the server
httpserver.listen(3000, function() {
  console.log("Listening on port 3000");
});

var servers = {};

var users = [];
function getNextId() {
  let maxId = 0;
  for (user in users) {
    if (user.id > maxId) {
      maxId = player.id;
    }
  }
  return maxId;
}

io.on("connection", function(socket) {
  let player, server, room;
  // console.log(socket.conn.id, socket.conn.remoteAddress);
  // console.log(socket);

  //use io.sockets.rooms to access the rooms
  //use socket.conn.remoteAddress to reconnect to player

  //socket.emit("event",data1,data2,...) for specific
  //io.emit("event",data1,data2,...) for all
  //socket.on("event",function(date){}) to receive
  socket.on("register", function(username, password) {
    db.ref("users/" + username)
      .once("value")
      .then(function(userObject) {
        if (userObject.val()) {
          socket.emit(
            "register-failed",
            "Account with that username already exists!"
          );
          return false;
        } else {
          return true;
        }
      })
      .then(function(registerSuccess) {
        if (registerSuccess) {
          let id = getNextId();
          player = new Player(id, username);
          let user = new User(id, username, password);
          users.push(user);
          db.ref("users/" + username).set(user);
          socket.emit("register-success", player.id);
        }
      });
  });
  socket.on("login", function(username, password) {
    db.ref("users/" + username)
      .once("value")
      .then(function(userObject) {
        if (userObject.val()) {
          if (userObject.val().password === password) {
            let user = userObject.val();
            player = new Player(user.id, user.username);
            socket.emit("login-success", player.id);
          } else {
            socket.emit("login-failed", "Username or password incorrect");
          }
        } else {
          socket.emit("login-failed", "That account doesn't exist!");
        }
      });
  });
  socket.on("get-servers", function() {
    socket.emit("load-servers", servers);
  });
  socket.on("create-server", function(serverName) {
    if (servers[serverName]) {
      socket.emit("server-failure", "Server name already exists!");
    } else {
      servers[serverName] = new Server(serverName);
      socket.join(serverName);
      server = servers[serverName];
      room = server.rooms["lobby"];
      server.newPlayer(player);
      socket.emit("load-server", server, player.id);
      socket.broadcast.to(serverName).emit("player-connected", player);
    }
  });
  //io.to or in("room name").emit...
  socket.on("join-server", function(serverName) {
    socket.join(serverName);
    server = servers[serverName];
    room = server.rooms["lobby"];
    server.newPlayer(player);
    socket.emit("load-server", server, player.id);
    socket.broadcast.to(serverName).emit("player-connected", player);
    console.log(player.username + " joined the server " + serverName);
  });

  socket.on("disconnect", function() {
    if (player && server) {
      console.log(
        "Player " +
          player.username +
          " disconnected from the server " +
          server.name
      );
      server.removePlayer(player);
      io.to(server.name).emit("player-disconnected", player.id, player.room);
      if (server.empty) {
        delete servers[server.name];
      }
    }
  });
  socket.on("update-coordinates", function(playerId, room, x, y) {
    server.updateCoordinates(playerId, room, x, y);
    socket.broadcast.to(server.name).emit("move-player", playerId, room, x, y);
  });
  socket.on("ready", function(ready) {
    if (room.name == "lobby") {
      room.ready(player.id, ready);
      socket.broadcast.to(server.name).emit("ready-player", player.id, ready);
      if (server.lobbyReady()) {
        socket.emit("start-timer", "lobby", 10000);
      }
    }
  });
  socket.on("timer-up", function(timer) {
    switch (timer) {
      case "lobby":
        if (server.lobbyReady()) {
          server.startGame("pvp");
          room = server.rooms["game"];
          io.to(server.name.emit("start-game", room));
        }
        break;
    }
  });
});
