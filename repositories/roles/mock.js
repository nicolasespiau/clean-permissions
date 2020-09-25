"use strict";

module.exports = class {
  constructor() {
    this.roles = {};
    this.nextId = 1;
  }

  async add(role) {
    if (!!this.roles[role.id]) {
      throw new Error("role already exists");
    }

    role.id = this.nextId;
    this.nextId++;
    this.roles[role.id] = role;
    return role;
  }

  async update(role) {
    this.roles[role.id] = Object.assign(this.roles[role.id], role);
    return this.roles[role.id];
  }

  async delete(roleId) {
    if(!this.roles[roleId]) {
      throw new Error("role does not exist")
    }
    delete this.roles[roleId];
  }

  async getById(roleId) {
    return this.roles[roleId];
  }
};