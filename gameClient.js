var socket = io("http://192.168.0.110:3000");
socket.on("connect", function() {
  console.log("Connected to server on port 3000");
});
// function_ is ask
// function is to receive

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  game.currentScene.resize();
}
function registerAccount_(u, p) {
  socket.emit("register", u, p);
}
socket.on("register-failed", function(message) {
  console.log(message);
});
socket.on("register-success", function() {
  game.changeScene("selection");
});

function loginAccount_(u, p) {
  socket.emit("login", u, p);
}
socket.on("login-failed", function(message) {
  console.log(message);
});
socket.on("login-success", function() {
  game.changeScene("selection");
});

function getServers_() {
  socket.emit("get-servers");
}
socket.on("load-servers", function(servers) {
  const serversNode = document.getElementById("servers");
  while (serversNode.firstChild) {
    serversNode.removeChild(serversNode.firstChild);
  }
  if (servers) {
    for (server in servers) {
      let serverButton = document.createElement("button");
      serverButton.innerHTML = server;
      serverButton.onclick = () => {
        joinServer_(server);
      };
      serversNode.appendChild(serverButton);
    }
  }
});

function createServer() {
  game.changeScene("create");
}

function logOut() {
  game.changeScene("menu");
}
function backToSelection() {
  game.changeScene("selection");
}
function createServer_() {
  socket.emit("create-server", document.getElementById("server-name").value);
}

function joinServer_(serverName) {
  socket.emit("join-server", serverName);
}

socket.on("server-failure", function(message) {
  console.log(message);
});
socket.on("load-server", function(server, playerId) {
  game.changeScene("game", {
    server: server,
    room: server.rooms["lobby"],
    playerId: playerId
  });
});
socket.on("player-connected", function(player) {
  //add the new player to the lobby
  game.scenes["game"].addPlayer(player);
});
socket.on("player-disconnected", function(playerId) {
  game.scenes["game"].removePlayer(playerId);
});

function keyPressed() {
  //do client side, and then update coordinates socket emit
  // if (key == "w" || key == "a" || key == "s" || key == "d") {
  //   socket.emit("move-player", key);
  // }
  // if (game.currentScene.name == "game") {
  //   if (key == "w" || key == "a" || key == "s" || key == "d") {
  //     game.currentScene.move(key);
  //     updateCoordinates_(game.currentScene.player);
  //   }
  // }
}
function updateCoordinates_(player) {
  socket.emit(
    "update-coordinates",
    player.id,
    player.room,
    player.center.x,
    player.center.y
  );
}
socket.on("move-player", function(playerId, room, x, y) {
  game.currentScene.movePlayer(playerId, room, x, y);
  //potentially initiate a reactive check for collision?
});

function ready_(ready) {
  socket.emit("ready", ready);
}
socket.on("ready-player", function(playerId, ready) {
  game.currentScene.readyPlayer(playerId, ready);
});

socket.on("start-timer", function(timer, millis) {
  game.scenes["game"].startTimer(timer, millis);
});
function stopTimer_(timer) {
  socket.on("stop-timer", timer);
}
socket.on("start-game", function(room) {
  game.currentScene.startGame(room);
});

// socket.on("move-player", function(playerId, key) {
//   game.currentScene.movePlayer(playerId, key);
// });

function mousePressed() {
  mouse = true;
}
function mouseReleased() {
  mouse = false;
}
