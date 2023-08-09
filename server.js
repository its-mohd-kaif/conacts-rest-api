const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/contacts", require("./routes/ContactRoutes"));
app.use("/api/users", require("./routes/UserRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
