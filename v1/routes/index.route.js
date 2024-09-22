const taskRoutes = require("./task.route.js");
const userRoutes = require("./user.route.js");

module.exports = (app) => {
    const version = "/api/v1";

    app.use(`${version}/tasks`, taskRoutes)

    app.use(`${version}/users`, userRoutes)

}