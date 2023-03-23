const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("records", { record: 1 });
    response.status(200).json(users);
});

usersRouter.post("/", async (request, response) => {
    const { username, password } = request.body;

    if (password.length <= 3 || username.length <= 3) {
        response
            .status(401)
            .json({
                error: "username and passord must be more than 3 characters",
            })
            .end();
    } else {
        const saltRounds = 10;

        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            username,
            passwordHash,
        });

        const savedUser = await user.save();

        response.status(201).json(savedUser);
    }
});

usersRouter.delete("/:id", async (request, response) => {
    await User.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

module.exports = usersRouter;
