"use strict";

const RoleModel = require("../../models/Role.model");
const Schema = require("mongoose").Schema;

const RoleSchema = new Schema({
  "name": {
    type: String,
    required: true
  },
  "description": {
    type: String,
    required: false
  }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

module.exports = class {
  constructor(mongoose) {
    this.model = mongoose.model("roles", RoleSchema);
  }

  async add(role) {
    let dbRole = new this.model(role);
    dbRole = await dbRole.save();
    return new RoleModel(dbRole.name, dbRole.description, dbRole.id);
  }

  async update(role) {
    const id = role.id;
    delete role.id;
    return this.model.findByIdAndUpdate(id, role);
  }

  async delete(roleId) {
    return this.model.removeById(roleId);
  }

  async getById(roleId) {
    const role = await this.model.findById(roleId);
    return new RoleModel(role.rolename, role.roles, role.id);
  }
};