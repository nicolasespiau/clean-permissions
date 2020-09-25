"use strict";

//init dependencies:
// - logger
// - persistence service
// - cache service

//this file initiate dependencies according to conf
module.exports = (conf) => {
    //LoggerService
    const WinstonService = require("../services/Winston");
    const winstonOpt = require("../config/config").getLogSettings();
    const LoggerService = WinstonService(winstonOpt);

    //Data PersistenceService
    let PersistenceService;
    if (conf.mockDb) {
      PersistenceService = null;
    } else {
      const mongoOpts = require("../config/config").getMongoConf();
      const MongooseFactory = require("../services/MongooseFactory");
      const PersistenceServiceFactory = new MongooseFactory(mongoOpts);
      PersistenceService = PersistenceServiceFactory.Init();
      PersistenceService.connection.on("connected", () => {
        LoggerService.info("Connected to DB");
      });
      PersistenceService.connection.on("error", (e) => {
        LoggerService.info("Connection failed");
        LoggerService.error(e);
      });
    }

    //error handler
    const ErrorHandler = require("../services/ErrorHandler");

    return {
      PersistenceService,
      LoggerService,
      ErrorHandler
    }
};
