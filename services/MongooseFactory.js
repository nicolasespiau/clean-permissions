'use strict'

const PersistenceServiceFactory = require("./interfaces/PersistenceServiceFactory");

module.exports = class MongooseServiceFactory extends PersistenceServiceFactory {
  constructor(opts) {
    super();
    this.opts = opts;
    return this;
  }

  Init() {
    const mongoose = require("mongoose");
    const sprintf = require("util").format;
    const conStr = sprintf("mongodb://%s:%s/%s", this.opts.host, this.opts.port, this.opts.db);
    
    mongoose.connect(conStr+(!!this.opts.authSource ? "/?authSource="+this.opts.authSource : ""), {
      dbName: this.opts.db,
      user: this.opts.user,
      pass: this.opts.password,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).catch((e) => {
      console.error("mongoose connection failed", e);
    });
    
    return mongoose;
  }
}