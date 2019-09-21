class MapGUI extends GUI {
  constructor() {
    super("map", 0, 0, windowWidth, windowHeight);
  }
  start(data) {
    this.players = data.players;
    this.map = data.map;
    this.object = false;
  }
  stop() {}
  update() {}
  draw(transform) {
    image(this.map.image, transform.x, transform.y);
    for (let p of this.players) {
      p.draw(transform);
    }
    if (this.object) {
      fill(100, 100, 100);
      rect(
        windowWidth - textWidth(this.object.name) - 220,
        windowHeight - 70,
        textWidth(this.object.name) + 200,
        50
      );
      fill(0, 0, 0);
      textAlign(CENTER, CENTER);
      text(
        this.object.name,
        windowWidth - textWidth(this.object.name) / 2 - 120,
        windowHeight - 45
      );
    }
  }
  inspectObject(object) {
    this.object = object;
  }
  resize() {
    this.width = windowWidth;
    this.height = windowHeight;
  }
}
