require("dotenv").config();

const { PORT, CRYPTO_KEY, CRYPTO_IV } = process.env;
const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI,
    PORT,
    CRYPTO_KEY,
    CRYPTO_IV,
};
