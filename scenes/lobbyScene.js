// const TILE_SIZE = 50;
// class LobbyScene extends Scene {
//   constructor() {
//     super("lobby");
//     this.body = document.getElementById("lobby-scene");
//     this.countdown = document.getElementById("countdown");
//   }
//   load(data) {
//     this.chat = { Room: data.room.chat, Server: data.server.chat };
//     this.map = data.room.map;
//     this.mapImage = loadImage("assets/lobby.png");
//     this.triggers = data.room.triggers;
//     this.players = [];
//     for (let player of data.room.players) {
//       this.players.push(new Player(player));
//     }
//     if (this.players) {
//       for (let p of this.players) {
//         if (p.id == data.playerId) {
//           this.player = p;
//         }
//       }
//     }
//     this.serverStatus = data.server.status;
//     this.startTime = 0;
//     this.timer = 0;
//     this.buttons = [];
//     this.buttons.push(new Button("Ready!", 1000, 100));
//     this.body.style.display = "block";
//     this.transX = 0;
//     this.transY = 0;
//   }
//   update() {
//     for (let i = 0; i < this.buttons.length; i++) {
//       this.buttons[i].update();
//       if (this.buttons[i].clicked) {
//         switch (i) {
//           case 0:
//             playerReady_(this.player.ready);
//             break;
//         }
//       }
//     }
//     this.transX = -this.player.x + windowWidth / 2;
//     this.transY = -this.player.y + windowHeight / 2;
//     //look through map data, see if mouse is hovering over any items
//     if (mouse) {
//       //stuff here
//     }
//     if (this.startTime > 0) {
//       this.countdown.innerHTML = this.timer;
//       this.timer -= new Date().getTime() - this.startTime;
//     }

//     if (this.timer < 0) {
//       startGame_();
//       this.timer = 0;
//       this.startTime = 0;
//     }
//     this.draw();
//   }
//   draw() {
//     image(this.mapImage, this.transX, this.transY);
//     for (let p of this.players) {
//       fill(255, 0, 0);
//       rect(p.x + this.transX, p.y + this.transY, 40, 40);
//     }
//     for (let button of this.buttons) {
//       button.draw();
//     }
//   }
//   stop() {
//     this.body.style.display = "none";
//   }
//   addPlayer(player) {
//     this.players.push(new Player().copy(player));
//   }
//   removePlayer(playerId) {
//     for (let i = 0; i < this.players.length; i++) {
//       if (this.players[i].id == playerId) {
//         this.players.splice(i, 1);
//       }
//     }
//   }
//   getPlayerStatus(playerId) {
//     for (let player of this.players) {
//       if (player.id == playerId) {
//         return player.status;
//       }
//     }
//     return false;
//   }
//   playerReady(playerId, ready) {
//     for (let player of this.players) {
//       if (player.id == playerId) {
//         player.ready = ready;
//       }
//     }
//   }
//   movePlayer(playerId, key) {
//     for (let p of this.players) {
//       if (p.id == playerId) {
//         switch (key) {
//           case "w":
//             p.y -= 1;
//             break;
//           case "s":
//             p.y += 1;
//             break;
//           case "a":
//             p.x -= 1;
//             break;
//           case "d":
//             p.x += 1;
//             break;
//         }
//       }
//     }
//   }
//   setLobbyTimer(time) {
//     this.timer = time;
//     this.startTime = new Date().getTime();
//   }
// }
