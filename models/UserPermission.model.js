"use strict";

module.exports = class UserPermission {
  constructor(userId, entity, method, allowed, except) {
    this.id = null;
    this.user_id = userId;
    this.entity = entity;
    this.method = method;
    this.allowed = allowed;
    this.except = except;
  }
}