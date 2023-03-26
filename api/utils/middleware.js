const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token",
        });
    }
    if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired",
        });
    }

    next(error);
};

// isolates token for authorization header
const tokenExtractor = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
};

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
};
