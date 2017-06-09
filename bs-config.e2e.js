//bs-config.e2e.js
module.exports = {
  "open": false,
  "logLevel": "silent",
  "port": process.env.PORT || 8080,
  "server": {
    "baseDir": "src",
    "routes": {
      "/node_modules": "node_modules"
    },
    "middleware": {
      "0": null
    }
  }
}