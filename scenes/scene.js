class Scene {
  constructor(name) {
    this.name = name;
    this.guistack = [];
  }
  load() {}
  update() {}
  stop() {}
  keyPressed(key) {}
  getGUI(guiName) {
    for (let gui of this.guistack) {
      if (gui.name == guiName) {
        return gui;
      }
    }
    return null;
  }
  pushGUI(gui, params = []) {
    gui.start(params);
    this.guistack.push(gui);
  }
  popGUI() {
    this.guistack[this.guistack.length - 1].stop();
    this.guistack.pop();
  }
  resize() {
    for (let gui of this.guistack) {
      gui.resize();
    }
  }
}
