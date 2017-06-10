//bs-config.js

IS_PROD_MODE = process.env.PORT ? true : false;
IS_DEV_MODE  = !IS_PROD_MODE;

module.exports = {
  "open": IS_DEV_MODE,
  "port": process.env.PORT || 8080,
  "server": {
    "baseDir": "src",
    "routes": {
      "/node_modules": "node_modules"
    }
  },
  "ghostMode": IS_DEV_MODE
}