"use strict";

module.exports = class RoleRepository {
  constructor() {}

  async add(role) {
    return notImplemented();
  }

  async update(role) {
    return notImplemented();
  }

  async delete(roleId) {
    return notImplemented();
  }

  async getById(roleId) {
    return notImplemented();
  }
}


function notImplemented() {
  return Promise.reject(new Error("not implemented"));
}