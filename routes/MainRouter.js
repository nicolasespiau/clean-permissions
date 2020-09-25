"use strict";

module.exports = (dependencies) => {
  const router = require("koa-router")();
  const UsersRouter = require("./UsersRouter")(dependencies);

  router.use("/", UsersRouter.routes());

  return router;
};