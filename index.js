"use strict";

const koa = require('koa');
const morgan = require('koa-morgan');
const koaBody = require('koa-bodyparser');
const appSettings = require('./config/config').getAppSettings();
const sprintf = require("util").format;
const fs = require('fs');
const https = require('https');
const Factory = require("./factories/main.fac");

const app = new koa();

const Services = Factory(appSettings);

app.use(Services.ErrorHandler);

app.use(async (ctx, next) => {
  ctx.logger = Services.LoggerService;
  await next();
});

app.on("error", (e) => {
  if (e.errno >= 500) {
    app.ctx.logger.error(e);
  }
})

app.use(morgan(':remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" :response-time ":req[X-Access-Token]"'));

app.use(koaBody({
  jsonLimit: '1kb'
}));

//force all responses to be json
app.use(async (ctx, next) => {
  ctx.response.type = "application/json";
  await next();
});

//load routes
const Router = require("./routes/MainRouter")(Services);
app.use(Router.routes());

/** SERVER CREATION **/
let server;
if (appSettings.sslEnabled) {
  const { default: enforceHttps } = require('koa-sslify');
  // Force HTTPS using default resolver
  app.use(enforceHttps({
    port: appSettings.port
  }));

  const httpsOptions = {
    key: fs.readFileSync(appSettings.sslKeyFile),
    cert: fs.readFileSync(appSettings.sslCertFile)
  };

  const serverCallback = app.callback();
  server = https.createServer(httpsOptions, serverCallback);
  server.listen(appSettings.port);
} else {
  server = app.listen(appSettings.port);
}

  server.on('listening', async () => {
    const hostname = require("os").hostname();
    console.log('MY-IDEA-POOL running on', hostname, 'port', appSettings.port);
  });
  server.on('close', async () => {
    try {
      await mongoose.close();
      app.context.logger.info("Mongo con closed");
    } catch (e) {
      app.context.logger.error(sprintf("Err when closing app: %s", e));
    }
  });

module.exports = server;