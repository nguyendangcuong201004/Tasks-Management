const express = require("express");
const env = require("dotenv");
env.config();
const database = require("./config/database");
database.connect();
const app = express();
const port = process.env.PORT;

const routerApiV1 = require("./v1/routes/index.route.js");
routerApiV1(app);

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})