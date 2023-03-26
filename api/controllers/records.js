const recordRouter = require("express").Router();
const Record = require("../models/record");
const User = require("../models/user");

recordRouter.get("/", async (request, response) => {
    const records = await Record.find({});
    response.status(200).json(records).end();
});

recordRouter.get("/:id", async (request, response) => {
    const userID = request.params.id;

    if (!userID) {
        response
            .status(400)
            .json({
                error: "user id is required to record a transcription",
            })
            .end();
    }

    const user = await User.findById(userID).populate("records", {
        record: 1,
        date: 1,
    });

    response.status(200).json(user.records).end();
});

recordRouter.post("/:id", async (request, response) => {
    const userID = request.params.id;

    if (!userID) {
        response
            .status(400)
            .json({
                error: "user id is required to record a transcription",
            })
            .end();
    }

    const user = await User.findById(userID);

    const updatedRecord = new Record({
        record: request.body.record,
        user: userID,
        date: new Date(),
    });

    const savedRecord = await updatedRecord.save();

    // eslint-disable-next-line no-underscore-dangle
    user.records = user.records.concat(savedRecord._id);
    await user.save();

    response.status(200).json(savedRecord).end();
});

module.exports = recordRouter;
