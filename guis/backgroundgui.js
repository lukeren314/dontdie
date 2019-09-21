class BackgroundGUI extends GUI {
  constructor() {
    super("background", 0, 0, windowWidth, windowHeight);
  }
  async start(data) {
    this.frame = 0;
    this.image = images["background"];
  }
  stop() {}
  update() {}
  draw(transform) {
    image(
      this.image,
      -this.frame % this.image.width,
      -this.frame % this.image.height
    );
    this.frame++;
  }
}
