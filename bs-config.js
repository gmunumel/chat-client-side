//bs-config.js

IS_PROD_MODE = process.env.PORT ? true : false;
ENABLE_BROWSER_SYNC = !IS_PROD_MODE;

module.exports = {
  "port": process.env.PORT || 8080,
  "server": {
    "baseDir": "src",
    "routes": {
      "/node_modules": "node_modules"
    }
  },
  "ghostMode": {
    clicks: ENABLE_BROWSER_SYNC,
    links: ENABLE_BROWSER_SYNC,
    forms: ENABLE_BROWSER_SYNC,
    scroll: ENABLE_BROWSER_SYNC
  }
}