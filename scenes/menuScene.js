class MenuScene extends Scene {
  constructor() {
    super("menu");
    this.body = document.getElementById("menu-scene");
  }
  load() {
    this.pushGUI(new BackgroundGUI());
    this.pushGUI(new MenuGUI());
    this.body.style.display = "block";
  }
  update() {
    if (this.guistack[this.guistack.length - 1]) {
      this.guistack[this.guistack.length - 1].update();
      if (!this.guistack[this.guistack.length - 1].show) {
        this.popGUI();
      }
    }
    this.draw();
  }
  draw() {
    for (let gui of this.guistack) {
      gui.draw(false);
    }
  }
  stop() {
    this.body.style.display = "none";
  }
}
