const express = require("express");
const helmet = require("helmet");

const projectRouter = require("./data/helpers/projectRouter");
const actionsRouter = require("./data/helpers/actionsRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/api/projects", projectRouter, actionsRouter);

server.get("/", logger, (req, res) => {
    res.send(`<h2>NODE API SPRINT CHALLANGE</h2>`);
});


//custom middleware
function logger(req, res, next) {
    console.log(
        `${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`
    );
    next();
}

module.exports = server;