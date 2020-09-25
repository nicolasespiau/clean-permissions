'use strict'

const nconf = require("nconf");

nconf.env().argv();
nconf.file(nconf.any("CONFIG_FILE", "config"));

module.exports = {
    getAppSettings() {
        return {
            "port": nconf.get("PORT") || 80,
            "jwtSecret": nconf.get("APP_JWT_SECRETS") || "defaultsecret",
            "jwtTTL": nconf.get("APP_JWT_TTL") || "10 minutes",
            "sslEnabled": nconf.get("SSL_ENABLED") || false,
            "sslKeyFile": nconf.get("SSL_KEY_FILE"),
            "sslCertFile": nconf.get("SSL_CERT_FILE"),
            "mockDb": nconf.get("MOCK_DB") || false
        }
    },
    getLogSettings() {
        return {
            "level": nconf.get("LOG_LEVEL") || "error",
            "format": nconf.get("LOG_FORMAT") || "splat,simple",
            "transports": nconf.get("LOG_TRANSPORTS") || "console"
        }
    },
    getSaltRounds () {
        return nconf.get("SALT_ROUNDS") || 10;
    },
    getMongoConf() {
        return {
            "db": nconf.get("MONGO_DB"),
            "host": nconf.get("MONGO_HOST"),
            "port": nconf.get("MONGO_PORT"),
            "user": nconf.get("MONGO_USER"),
            "password": nconf.get("MONGO_PASSWD"),
            "replicaSet": nconf.get("MONGO_REPLSET"),
            "authSource": nconf.get("MONGO_AUTHSOURCE") || false
        };
    }
}