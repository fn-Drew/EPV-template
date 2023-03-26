const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
require("express-async-errors");

const app = express();

const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const recordRouter = require("./controllers/records");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);

logger.info("Connecting to server", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to server: ", config.MONGODB_URI);
        logger.info("Server running on PORT: ", config.PORT);
    })
    .catch((error) => {
        logger.info(error);
    });

app.use(cors());
app.use(express.json());

app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);
app.use("/api/records/", recordRouter);

app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);

app.use(cors());
app.use(express.json());

module.exports = app;
