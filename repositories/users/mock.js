"use strict";

module.exports = class {
  constructor() {
    this.users = {};
    this.nextId = 1;
  }

  async add(user) {
    if (!!this.users[user.id]) {
      throw new Error("User already exists");
    }

    user.id = this.nextId;
    this.nextId++;
    this.users[user.id] = user;
    return user;
  }

  async update(user) {
    this.users[user.id] = Object.assign(this.users[user.id], user);
    return this.users[user.id];
  }

  async delete(userId) {
    if(!this.users[userId]) {
      throw new Error("User does not exist")
    }
    delete this.users[userId];
  }

  async getById(userId) {
    return this.users[userId];
  }

  async getByUsername(username) {
    for (const user in this.users) {
      if (user.username === username) {
        return user;
      }
    }
    return null;
  }
};