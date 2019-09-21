class Button {
  constructor(label, x, y) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = textWidth(this.label);
    this.height = 16;
    this.clicked = false;
  }
  update() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.width &&
      mouseY > this.y &&
      mouseY < this.y + this.height
    ) {
      if (mouse) {
        this.clicked = true;
      } else {
        this.clicked = false;
      }
    }
  }
  draw() {
    textAlign(LEFT, TOP);
    fill(0, 0, 0);
    text(this.label, this.x, this.y);
  }
}
