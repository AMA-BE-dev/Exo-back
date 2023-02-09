// LIBRAIRIES

const express = require('express');
const config = require('./config/index.js')
const {initapp} = require('./config/appConfig.js')
const cluster = require('cluster')
const process = require('process')
const os = require('os')
const format = require("./routes/format");

// init variable

const app = express();
const numCPUs = os.cpus().length;

// Create cluster and start server

if (cluster.isPrimary) {

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        if (signal) {
            console.log(`worker was killed by signal: ${signal}`);
        } else if (code !== 0) {
            console.log(`worker exited with error code: ${code}`);
        } else {
            console.log('worker success!');
        }
    });

} else {

    // start server

    app.listen(config.port,  () => {
        return console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      🛡  Worker ${process.pid} started           🛡
      🛡  Hosting 0.0.0.0 started           🛡
      ################################################
    `);
    }).on('error', err => {
        console.log(err)
    });
}

initapp(app)
app.use("/format", format);
