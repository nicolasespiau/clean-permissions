"use strict";

const User = require("../models/User.model");
const Errors = require("./Errors.common");

module.exports = (UserRepository) => {

  async function Execute(userId) {
    if (!userId) {
      throw new Errors.BadParamsError("userId empty");
    }

    return await UserRepository.getById(userId);
  }
  
  return {
    Execute
  };
}