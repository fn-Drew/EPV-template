const app = require("./app");
const config = require("./utils/config");

if (config.PORT) {
    app.listen(config.PORT, () => {
        console.log(`Server is running on port  ${config.PORT}`);
    });
}
