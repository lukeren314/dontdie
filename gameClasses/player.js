class Player {
  constructor(playerObject) {
    this.id = playerObject.id;
    this.username = playerObject.username;
    this.inventory = playerObject.inventory;
    this.center = createVector(playerObject.x, playerObject.y);
    this.velocity = createVector(0, 0);
    this.speed = playerObject.speed;
    this.ready = playerObject.ready;
    this.status = playerObject.status;
    this.room = playerObject.room;
    this.name = "player";
    // this.image = loadImage("assets/" + this.name + ".png");
    this.image = images["player"];
    this.size = createVector(40, 40);
    this.halfsize = createVector(this.size.x / 2, this.size.y / 2);
  }
  left() {
    return this.center.x - this.halfsize.x;
  }
  right() {
    return this.center.x + this.halfsize.x;
  }
  top() {
    return this.center.y - this.halfsize.y;
  }
  bottom() {
    return this.center.y - this.halfsize.y;
  }
  // topleft() {
  //   return createVector(
  //     this.center.x - this.halfsize.x,
  //     this.center.y - this.halfsize.y
  //   );
  // }
  // topRight() {
  //   return createVector(
  //     this.center.x + this.halfsize.x,
  //     this.center.y - this.halfsize.y
  //   );
  // }
  // bottomLeft() {
  //   return createVector(
  //     this.center.x - this.halfsize.x,
  //     this.center.y + this.halfsize.y
  //   );
  // }
  // bottomRight() {
  //   return createVector(
  //     this.center.x + this.halfsize.x,
  //     this.center.y + this.halfsize.y
  //   );
  // }
  update() {}
  draw(transform) {
    image(
      this.image,
      this.center.x - this.halfsize.x + transform.x,
      this.center.y - this.halfsize.y + transform.y
    );
    // fill(255, 0, 0);
    // rect(
    //   this.center.x - this.halfsize.x,
    //   this.center.y - this.halfsize.y,
    //   this.size.x,
    //   this.size.y
    // );
  }
}
