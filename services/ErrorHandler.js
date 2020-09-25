"use strict";

const AppError = require("@bonjourjohn/app-error");

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    //if caught error is not AppError, lets convert it
    if (!err.name || err.name !== "AppError") {
      err = AppError.fromError(err);
    }

    ctx.app.emit('error', err);

    // will only respond with JSON
    ctx.status = err.errno;
    ctx.body = {
      errno: err.errno,
      error: err.error
    };
  }
};