"use strict";

module.exports = class Role {
  constructor (name, description, id = null) {
    this._id = id;
    this.name = name;
    this.description = description;
  }
}