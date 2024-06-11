//import express, the database connection to mongo, and the routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
//set the app port
const PORT = process.env.PORT || 3001;
const app = express();

//add the middleware to handle urlencoded or json data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//make the connection to mongoose and the port for the app
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
