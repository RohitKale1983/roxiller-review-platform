const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);

const storeRoutes = require("./routes/store.routes");

app.use("/api/stores", storeRoutes);

const ratingRoutes = require("./routes/rating.routes");
app.use("/api/ratings", ratingRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);


module.exports = app;
