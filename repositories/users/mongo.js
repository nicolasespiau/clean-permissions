"use strict";

const UserModel = require("../../models/User.model");
const Schema = require("mongoose").Schema;

const UserSchema = new Schema({
  "username": {
    type: String,
    required: true
  },
  "roles": {
    type: [Number],
    required: true
  }
}, {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}});

UserSchema.index({username: 1}, {unique: true});

module.exports = class {
  constructor(mongoose) {
    this.model = mongoose.model("users", UserSchema);
  }

  async add(user) {
    let dbUser = new this.model(user);
    dbUser = await dbUser.save();
    return new UserModel(dbUser.username, dbUser.roles, dbUser.id);
  }

  async update(user) {
    const id = user.id;
    delete user.id;
    return this.model.findByIdAndUpdate(id, user);
  }

  async delete(userId) {
    return this.model.removeById(userId);
  }

  async getById(userId) {
    const user = await this.model.findById(userId).lean().exec();
    if (!user) return null;

    return new UserModel(user.username, user.roles, user._id);
  }

  async getByUsername(username) {
    const user = await this.model.findOne({"username": username}).lean().exec();
    if (!user) return null;

    return new UserModel(user.username, user.roles, user._id);
  }
};