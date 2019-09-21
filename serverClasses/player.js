class Player {
  constructor(id = -1, username = "") {
    this.id = id;
    this.username = username;
    this.inventory = [];
    this.x = 500;
    this.y = 300;
    this.speed = 5;
    this.ready = false;
    this.status = "lobby";
    this.room = "Lobby Room";
  }
}

module.exports = { Player };
