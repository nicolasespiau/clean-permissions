"use strict";

module.exports = (dependencies, conf) => {
  let UserRepository;
  let RoleRepository;
  let PermissionRepository;
  if (conf.mockDb) {
    UserRepository = new (require("../repositories/users/mock"))();
    RoleRepository = new (require("../repositories/roles/mock"))();
    PermissionRepository = new (require("../repositories/roles/mock"))();
  } else {
    const UserRepositoryClass = require("../repositories/users/mongo");
    UserRepository = new UserRepositoryClass(dependencies.PersistenceService);
    const RoleRepositoryClass = require("../repositories/roles/mongo");
    RoleRepository = new RoleRepositoryClass(dependencies.PersistenceService);
    //const PermissionRepositoryClass = require("../../repositories/permissions/mongo");
    //PermissionRepository = new PermissionRepositoryClass(dependencies.PersistenceService);
  }

  return {
    UserRepository,
    RoleRepository,
    PermissionRepository
  }
};