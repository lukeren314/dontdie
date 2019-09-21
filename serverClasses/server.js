const Room = require("./room.js").Room;

class Server {
  constructor(name = "Bob") {
    this.name = name;
    this.rooms = {};
    this.rooms["lobby"] = new Room("lobby");
    this.rooms["lobby"].loadMap("lobby");
    this.rooms["game"] = new Room("game");
    this.status = "lobby";
    this.chat = [];
    this.users = [];
  }
  newPlayer(player) {
    this.rooms["lobby"].addPlayer(player);
    this.users.push(player);
  }
  removePlayer(playerId) {
    for (let room in this.rooms) {
      this.rooms[room].removePlayer(playerId);
    }
  }
  getRoom(playerId) {
    for (let room in this.rooms) {
      if (this.rooms[room].hasPlayer(playerId)) {
        return room.name;
      }
    }
  }
  lobbyReady() {
    let readyCount = 0;
    for (let i = 0; i < this.rooms["lobby"].players.length; i++) {
      if (this.rooms["lobby"].players[i].ready) {
        readyCount++;
      }
    }
    if (this.status == "lobby" && readyCount >= 1) {
      return true;
    }
    return false;
  }
  startGame(type) {
    this.rooms["game"] = new Room("game");
    this.rooms["game"].type = type;
    this.rooms["game"].loadMap(this.rooms["game"].type);
    this.status = "game";
    for (let player of this.rooms["lobby"].players) {
      this.rooms["game"].addPlayer(player);
    }
    this.rooms["lobby"].players = [];
  }
  empty() {
    for (let room in this.rooms) {
      for (let player of this.rooms[room]) {
        if (player) {
          return false;
        }
      }
    }
    return true;
  }
  updateCoordinates(playerId, room, x, y) {
    this.rooms[room].movePlayer(playerId, x, y);
  }
}

module.exports = { Server };
