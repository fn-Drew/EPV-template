const jwt = require('jsonwebtoken')
const recordRouter = require("express").Router();
const crypto = require("node:crypto");
const config = require("../utils/config");
const Record = require("../models/record");
const User = require("../models/user");
const { tokenExtractor } = require("../utils/middleware");

const { SECRET } = process.env
const algorithm = "aes-256-cbc";
const key = config.CRYPTO_KEY;
const iv = crypto.randomBytes(16);

recordRouter.get("/", async (request, response) => {
    const records = await Record.find({});
    response.status(200).json(records).end();
});

// get unencrypted records
recordRouter.get("/:id", async (request, response) => {

    const decodedToken = jwt.verify(tokenExtractor(request), SECRET)
    const userID = decodedToken.id;
    if (!userID) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(userID).populate("records");

    function decrypt(text) {
        const decIV = Buffer.from(text.iv, "hex");
        const encryptedText = Buffer.from(text.encryptedData, "hex");
        const decipher = crypto.createDecipheriv(
            algorithm,
            Buffer.from(key),
            decIV
        );
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }

    // maybe an expensive calculation
    const decryptedRecords = user.records.map((record) => {
        const decryptedRecord = decrypt(record.encryptedRecord);
        return {
            record: decryptedRecord,
            date: record.date,
            id: record.id,
        };
    });

    response.status(200).json(decryptedRecords).end();
});

recordRouter.post("/:id", async (request, response) => {

    const decodedToken = jwt.verify(tokenExtractor(request), SECRET)
    const userID = decodedToken.id;
    if (!userID) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (!userID) {
        response
            .status(400)
            .json({
                error: "user id is required to record a transcription",
            })
            .end();
    }

    function encrypt(text) {
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString("hex"),
            encryptedData: encrypted.toString("hex"),
        };
    }

    const encryptedRecord = encrypt(request.body.record);

    const user = await User.findById(userID);

    const updatedRecord = new Record({
        encryptedRecord,
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
