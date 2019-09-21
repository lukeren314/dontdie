var game, images, mouse;
function preload() {
  document.getElementById("loading-overlay").style = "block";
  images = {};
  images["lobby"] = loadImage("assets/lobby.png");
  images["background"] = loadImage("assets/Nebula Blue.png");
  images["player"] = loadImage("assets/player.png");
  document.getElementById("loading-overlay").style = "none";
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  game = new Game();
  game.load();
  mouse = false;
}

function draw() {
  background(100, 255, 255);
  game.update();
}
