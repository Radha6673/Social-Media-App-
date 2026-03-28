const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const auth = require("./routes/auth");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongo_url)
.then(() => console.log("connected"))
.catch((err) => console.log(err));

app.use("/api/auth",auth);

app.listen(process.env.port||5000,() => console.log("server is running on port 5000"))