const express = require("express");
const mongoose = require("mongoose");
const bugRoutes = require("./routes/bugs");
const userRoutes = require("./routes/users");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
//Middleware setup
app.use(cors());
app.use(express.json());

//Config setup
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/process.env" });

//DB connect
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//Routes
app.use("/bugs", bugRoutes);
app.use("/users", userRoutes);

//Serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on 5k");
});
