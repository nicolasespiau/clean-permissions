"use strict";

const User = require("../models/User.model");
const { AlreadyExistsError, BadParamsError } = require("./Errors.common");


module.exports = (UserRepository) => {

  async function Execute(username, roles) {
    if (!username || !roles) {
      throw new BadParamsError("username and/or roles empty");
    }

    const user = await UserRepository.getByUsername(username);
    if (!!user) {
      throw new AlreadyExistsError("User");
    }

    return await UserRepository.add(new User(username, roles));
  }
  
  return {
    Execute
  };
}