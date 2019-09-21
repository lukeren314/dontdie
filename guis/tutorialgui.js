class TutorialGUI extends GUI {
  constructor() {
    super("tutorial", 100, 100, windowWidth - 200, windowHeight - 200);
  }
  start(data) {}
  stop() {}
  update() {
    if (mouse) {
      if (
        mouseX < this.x ||
        mouseY < this.y ||
        mouseX > this.x + this.width ||
        mouseY > this.y + this.height
      ) {
        this.show = false;
      }
    }
  }
  draw(transform) {
    fill(0, 0, 255);
    rect(this.x, this.y, this.width, this.height);
    fill(0, 0, 0);
    textAlign(CENTER, TOP);
    text(
      "Hello!\nWelcome to my game\nClick on the ready button down below to start!",
      this.x + this.width / 2,
      this.y + 50
    );
  }
  resize() {
    this.width = windowWidth - 200;
    this.height = windowHeight - 200;
  }
}
