"use strict";

const {createLogger, format, transports} = require("winston");

module.exports = (options) => {
  if (options.format) {
      const combineArgs = options.format.split(",").map(singleformat => {
          return format[singleformat]();
      });
      options.format = format.combine(...combineArgs);
  }
  if (options.transports) {
      const logtransports = options.transports.split(",").map(transportName => {
          return new transports[transportName]();
      })
      options.transports = logtransports;
  }
  return createLogger(options);
};