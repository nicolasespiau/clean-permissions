"use strict";

const AppError = require("@bonjourjohn/app-error");
const AddUser = require("../use_cases/AddUser.uc");
const AddUserErrors = require("../use_cases/Errors.common");
const FindUser = require("../use_cases/FindUser.uc");

module.exports = (dependencies) => {
  const {UserRepository} = dependencies;

  return {
    async RegisterNewUser(ctx, next) {
      const {username, roles} = ctx.request.body;
      const AddUserCommand = AddUser(UserRepository);
      let user;
      try {
        user = await AddUserCommand.Execute(username, roles);
      } catch (e) {
        if (e instanceof AddUserErrors.AlreadyExistsError) {
          throw new AppError(e.code, e.message, e.stack);
        }
      }

      ctx.status = 201;
      ctx.body = user;

      next();
    },

    async GetUser(ctx, next) {
      const FindUserCommand = FindUser(UserRepository);
      const user = await FindUserCommand.Execute(ctx.params.id);

      if (!user) {
        throw new AppError(404, "User not found");
      }

      ctx.status = 200;
      ctx.body = user;

      next();
    }
  }
};