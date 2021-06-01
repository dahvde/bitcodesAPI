require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const rateLimit = require("express-rate-limit");

const updateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 8,
});

const getLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 40,
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use("/sites", getLimiter);
app.use("/sites/:id", updateLimiter);
app.use(cors());
app.use(express.json());

const sitesRoute = require("./routes/sites");

app.use("/sites", sitesRoute);

app.listen("5050", () => console.log("server started"));
