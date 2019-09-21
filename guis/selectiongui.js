class SelectionGUI extends GUI {
  constructor() {
    super("selection", 50, 50, windowWidth - 100, windowHeight - 100);
  }
  start(data) {}
  stop() {}
  update() {}
  draw(transform) {
    fill(0, 0, 255);
    rect(this.x, this.y, this.width, this.height);
  }
  resize() {
    this.width = windowWidth - 100;
    this.height = windowHeight - 100;
  }
}
