"use strict";

class AlreadyExistsError extends Error {
  constructor(object) {
    super();
    this.code = 400;
    this.message = "this "+object+" already exists";
  }
}
class NotFoundError extends Error {
  constructor(object, id) {
    super();
    this.code = 404;
    this.message = object+":"+id+" not found";
  }
}
class BadParamsError extends Error {
  constructor(message) {
    super();
    this.code = 400;
    this.message = message || "bad params";
  }
}

module.exports = {
  AlreadyExistsError,
  NotFoundError,
  BadParamsError
};