class GameScene extends Scene {
  constructor() {
    super("game");
    this.body = document.getElementById("game-scene");
  }
  load(data) {
    this.chat = { Lobby: data.room.chat, Server: data.server.chat };
    this.map = new Map(data.room.map);
    this.serverStatus = data.server.status;
    this.playerId = data.playerId;
    this.players = [];
    for (let player of data.room.players) {
      this.players.push(new Player(player));
    }
    if (this.players) {
      for (let p of this.players) {
        if (p.id == data.playerId) {
          this.player = p;
        }
      }
    }
    this.transform = createVector(0, 0);
    this.guistack = [];
    this.pushGUI(new BackgroundGUI());
    this.pushGUI(new MapGUI(), { players: this.players, map: this.map });
    this.pushGUI(new PlayerGUI(), { player: this.player, chat: this.chat });
    this.timers = {};

    this.body.style.display = "block";
  }
  update() {
    this.transform.x = -this.player.center.x + windowWidth / 2;
    this.transform.y = -this.player.center.y + windowHeight / 2;
    for (let timer in this.timers) {
      if (this.timers[timer].startTime > 0) {
        let timeLeft = new Date().getTime() - this.timers[timer].startTime;
        if (timeLeft > this.timers[timer].time) {
          this.timers[timer].startTime = 0;
          this.stopTimer(timer);
        } else {
          this.getGUI("player").updateTimer(
            timer,
            (this.timers[timer].time - timeLeft) / 1000
          );
        }
      }
    }

    this.move();
    this.player.center.add(this.player.velocity);
    this.player.velocity.mult(0);
    if (this.guistack[this.guistack.length - 1]) {
      this.guistack[this.guistack.length - 1].update();
      if (!this.guistack[this.guistack.length - 1].show) {
        this.popGUI();
      }
    }
    if (this.guistack.length < 4) {
      for (let object of this.map.objects) {
        if (
          mouseX > object.x + this.transform.x &&
          mouseY > object.y + this.transform.y &&
          mouseX < object.x + this.transform.x + object.width &&
          mouseY < object.y + this.transform.y + object.height
        ) {
          this.getGUI("map").inspectObject(object);
          if (mouse) {
            if (
              object.interact &&
              p5.Vector.sub(
                this.player.center,
                createVector(
                  object.x + object.width / 2,
                  object.y + object.height / 2
                )
              ).mag() < object.range
            ) {
              switch (object.id) {
                case 0:
                  this.pushGUI(new TutorialGUI());
                  break;
                case 1:
                  this.ready();
                  break;
              }
            }
            mouse = false;
          }
        }
      }
    }
    this.draw();
  }
  draw() {
    for (let gui of this.guistack) {
      gui.draw(this.transform);
    }
  }

  stop() {
    this.body.style.display = "none";
  }
  addPlayer(player) {
    if (this.player.status == "lobby") {
      this.players.push(new Player(player));
    }
  }
  removePlayer(playerId) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == playerId) {
        this.players.splice(i, 1);
      }
    }
  }
  move() {
    if (keyIsDown(87)) {
      this.player.velocity.y = -this.player.speed;
    }
    if (keyIsDown(65)) {
      this.player.velocity.x = -this.player.speed;
    }
    if (keyIsDown(83)) {
      this.player.velocity.y = this.player.speed;
    }
    if (keyIsDown(68)) {
      this.player.velocity.x = this.player.speed;
    }
    //check collisions between walls, and then objects, and then between players;
    for (let wall of this.map.walls) {
      if (
        checkObstacleCollision(this.player.center, this.player.halfsize, wall)
      ) {
        overlap = findObstacleOverlap(
          this.player.center,
          this.player.halfsize,
          wall
        );
        if (overlap.x == 0) {
          if (wall[0] + wall[2] / 2 > this.player.center.x) {
            this.player.velocity.x = min(this.player.velocity.x, 0);
          } else {
            this.player.velocity.x = max(this.player.velocity.x, 0);
          }
        } else if (overlap.y == 0) {
          if (wall[1] + wall[3] / 2 > this.player.center.y) {
            this.player.velocity.y = min(this.player.velocity.y, 0);
          } else {
            this.player.velocity.y = max(this.player.velocity.y, 0);
          }
        } else if (abs(overlap.x) <= abs(overlap.y)) {
          this.player.center.x += overlap.x;
          if (overlap.x < 0) {
            this.player.velocity.x = min(this.player.velocity.x, 0);
          } else {
            this.player.velocity.x = max(this.player.velocity.x, 0);
          }
        } else {
          this.player.center.y += overlap.y;
          if (overlap.y < 0) {
            this.player.velocity.y = min(this.player.velocity.y, 0);
          } else {
            this.player.velocity.y = max(this.player.velocity.y, 0);
          }
        }
      }
    }

    // this.checkPlayerCollisions();
  }
  movePlayer(playerId, room, x, y) {
    if (room == this.player.status) {
      for (let p of this.players) {
        if (p.id == playerId) {
          p.center.x = x;
          p.center.y = y;
        }
      }
    }
  }
  getRoom() {
    for (let room in this.map.rooms) {
      if (
        checkObjectCollision(
          this.player.center,
          this.player.halfsize,
          this.map.rooms[room].rect
        )
      ) {
        this.player.room = room;
      }
      return room;
    }
    return "";
  }
  ready() {
    this.player.ready = !this.player.ready;
    ready_(this.player.ready);
  }
  readyPlayer(playerId, ready) {
    for (let p of this.players) {
      if (p.id == playerId) {
        p.ready = ready;
      }
    }
  }
  startTimer(timer, time) {
    this.timers[timer] = {};
    this.timers[timer].startTime = new Date().getTime();
    this.timers[timer].time = time;
  }
  stopTimer(timerName) {
    switch (timerName) {
      case "lobby":
        stopTimer_(timerName);
        break;
    }
  }
  startGame(room) {
    this.map = new Map(room.map);
    this.status = "game";
    this.players = [];
    for (let player of room.players) {
      this.players.push(new Player(player));
    }
    if (this.players) {
      for (let p of this.players) {
        if (p.id == this.playerId) {
          this.player = p;
        }
      }
    }
    this.status = "game";
    this.timers = {};
  }
}
