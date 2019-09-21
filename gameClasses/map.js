class Map {
  constructor(mapObject) {
    this.name = mapObject.name;
    this.width = mapObject.width;
    this.height = mapObject.height;
    // this.image = loadImage("assets/" + this.name + ".png")

    this.image = images[this.name];
    this.walls = mapObject.walls;
    this.objects = mapObject.objects;
    this.rooms = {};
    for (let room of mapObject.rooms) {
      this.rooms[room.name] = {};
      this.rooms[room.name].rect = room.rect;
      this.rooms[room.name].walls = [];
      for (let wall of this.walls) {
        if (checkRectCollision(wall, room.rect)) {
          this.rooms[room.name].walls.append(wall);
        }
      }
      this.rooms[room.name].objects = [];
      for (let object of this.objects) {
        if (checkRectCollision(object.rect, room.rect)) {
          if (object.static) {
            this.rooms[room.name].walls.append(object.rect);
          }
          this.rooms[room.name].objects.append(object);
        }
      }
    }
  }
}
