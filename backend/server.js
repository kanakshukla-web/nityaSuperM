const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');

const db = require("../backend/database/connection")

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('./routes/route'));

app.listen(PORT, () => {
    console.log(`superM services are running smoothly at port ${PORT}..`)
})