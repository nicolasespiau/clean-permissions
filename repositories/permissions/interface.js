"use strict";


module.exports = class PermissionRepository {
  constructor() {}

  async addOne(permission) {
    return notImplemented()
  }

  async addMany(pemissions) {
    return notImplemented();
  }

  async insertOrUpdate(find, newPermission) {
    return notImplemented();
  }

  async delete(permissionId) {
    return notImplemented();
  }

  async getById(permissionId) {
    return notImplemented();
  }

  async addExceptionForUser(userId, entityName, method, allowed, entityId) {
    return notImplemented();
  }
}

function notImplemented() {
  return Promise.reject(new Error("not implemented"));
}