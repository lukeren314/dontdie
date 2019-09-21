class PlayerGUI extends GUI {
  constructor() {
    super("player", 0, 0, windowWidth, windowHeight);
  }
  start(data) {
    this.player = data.player;
    this.chat = data.chat;
    this.timers = {};
  }
  stop() {}
  update() {}
  draw(transform) {
    fill(255, 200, 255);
    textAlign(LEFT, TOP);
    text(this.player.username, 10, 10);
    for (let timer in this.timers) {
      switch (timer) {
        case "lobby":
          fill(255, 255, 255);
          text(this.timers[timer], this.width - 100, 10);
          break;
      }
    }
    if (this.player.ready) {
      fill(255, 0, 0);
      textAlign(LEFT, TOP);
      text("Ready!", 10, 50);
    }
  }
  resize() {
    this.width = windowWidth;
    this.height = windowHeight;
  }
  updateTimer(timer, time) {
    this.timers[timer] = time;
  }
}
