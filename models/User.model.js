"use strict";

const ObjectUtils = require("@bonjourjohn/utils").Objects;

module.exports = class User {
  constructor(username, roles, id = null) {
    this.id = id;
    this.username = username;
    this.roles = roles;
  }
}