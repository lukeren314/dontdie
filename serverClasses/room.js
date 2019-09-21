const fs = require("fs");
const path = require("path");
class Room {
  constructor(name) {
    this.name = name;
    this.type = "lobby";
    this.players = [];
    this.chat = [];
    this.map = {};
  }
  loadMap(mapName) {
    this.map = JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "/maps/" + mapName + ".json"))
    );
  }
  addPlayer(player) {
    player.x = this.map.spawnX;
    player.y = this.map.spawnY;
    player.room = this.name;
    player.inventory = [];
    this.players.push(player);
  }
  removePlayer(playerId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == playerId) {
        this.players.splice(i, 1);
      }
    }
  }

  hasPlayer(playerId) {
    for (let player of this.players) {
      if (player.id == playerId) {
        return true;
      }
    }
    return false;
  }
  ready(playerId, ready) {
    for (let player of this.players) {
      if (player.id == playerId) {
        player.ready = ready;
      }
    }
  }
  movePlayer(playerId, x, y) {
    for (let player of this.players) {
      if (player.id == playerId) {
        player.x = x;
        player.y = y;
      }
    }
  }
  // movePlayer(playerId, key) {
  //   for (let player of this.players) {
  //     if (player.id == playerId) {
  //       switch (key) {
  //         case "w":
  //           if (player.y > 0 && this.map[player.x][player.y - 1] == 1) {
  //             player.y -= 1;
  //             return true;
  //           }
  //           break;
  //         case "s":
  //           if (
  //             player.y < this.map[0].length - 1 &&
  //             this.map[player.x][player.y + 1] == 1
  //           ) {
  //             player.y += 1;
  //             return true;
  //           }
  //           break;
  //         case "a":
  //           if (player.x > 0 && this.map[player.x - 1][player.y] == 1) {
  //             player.x -= 1;
  //             return true;
  //           }
  //           break;
  //         case "d":
  //           if (
  //             player.x < this.map.length - 1 &&
  //             this.map[player.x + 1][player.y] == 1
  //           ) {
  //             player.x += 1;
  //             return true;
  //           }
  //       }
  //       return false;
  //     }
  //   }
  //   return false;
  // }
}

module.exports = { Room };
