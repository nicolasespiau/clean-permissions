"use strict";

module.exports = class {
  constructor() {
    return notImplemented();
  }

  async add(user) {
    return notImplemented();
  }

  async update(user) {
    return notImplemented();
  }

  async delete(userId) {
    return notImplemented();
  }

  async getById(userId) {
    return notImplemented();
  }

  async getByUsername(username) {
    return notImplemented();
  }
}


function notImplemented() {
  return Promise.reject(new Error("not implemented"));
}