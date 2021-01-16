const express = require("express");
require("dotenv/config");
const app = express();
const logger = require("morgan");
const colors = require("colors");
const errorHandler = require("./middlewares/error");
//Connection to Database
const connectDB = require("./config/db");
connectDB();
//Middlewares
app.use(express.json());
app.use(logger("dev"));

//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

//Mounting Routes
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);
//Starting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running at ${process.env.NODE_ENV} at PORT No: ${PORT}`.yellow.bold
  );
});

//handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //server close and exit process
  // server.close(() => process.exit(1))
});
