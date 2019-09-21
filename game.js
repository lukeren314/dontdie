class Game {
  constructor() {
    this.scenes = {};
    this.scenes["menu"] = new MenuScene();
    this.scenes["selection"] = new SelectionScene();
    // this.scenes["lobby"] = new LobbyScene();
    this.scenes["create"] = new CreateScene();
    this.scenes["game"] = new GameScene();
    this.currentScene = this.scenes["menu"];
  }
  load() {
    this.currentScene.load();
  }
  update() {
    this.currentScene.update();
  }
  changeScene(newScene, data = {}) {
    this.currentScene.stop();
    this.currentScene = this.scenes[newScene];
    this.currentScene.load(data);
  }
}
