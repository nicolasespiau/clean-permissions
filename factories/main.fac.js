"use strict";

//init dependencies:
// - persistence service
// - cache service
// - repositories

//this file initiate dependencies according to conf
module.exports = (conf) => {
  const Services = require("./services.fac")(conf);
  const Repositories = require("./repositories.fac")(Services, conf);

  return {
    ...Services,
    ...Repositories
  }
};
