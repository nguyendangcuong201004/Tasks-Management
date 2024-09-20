const express = require("express");
const cors = require('cors')
const env = require("dotenv");
env.config();
const database = require("./config/database");
const bodyParser = require('body-parser')
database.connect();
const app = express();
const port = process.env.PORT;


app.use(cors()) // all url acess
app.use(bodyParser.json())

const routerApiV1 = require("./v1/routes/index.route.js");
routerApiV1(app);

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`)
})