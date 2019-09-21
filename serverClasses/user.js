class User {
  constructor(
    id = -1,
    username = "",
    password = "",
    timeCreated = new Date().getTime()
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.timeCreated = timeCreated;
  }
  copy(old) {
    this.id = old.id;
    this.username = old.username;
    this.password = old.password;
    this.timeCreated = old.timeCreated;
  }
}

module.exports = { User };
