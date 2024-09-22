const taskRoutes = require("./task.route.js");
const userRoutes = require("./user.route.js");

const requireAuth = require("../../middlewares/auth.middleware.js");

module.exports = (app) => {
    const version = "/api/v1";

    app.use(`${version}/tasks`, requireAuth.requireAuth, taskRoutes)

    app.use(`${version}/users`, userRoutes)

}