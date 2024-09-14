const taskRoutes = require("./task.route.js");

module.exports = (app) => {
    const version = "/api/v1";
    app.use(`${version}/tasks`, taskRoutes)
}