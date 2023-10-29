require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const path = require("path");
const dbConnect = require("./config/databaseConnection.js");
const mongoose = require("mongoose");

dbConnect();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use(cors(corsOptions));

app.use("/products", require("./routes/productRoute"));

mongoose.connection.once("open", () => {
    console.log("connected to mongo database");
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});
