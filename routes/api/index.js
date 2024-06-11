//import express userRoutes and thoughtRoutes
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//route to /api/users or /api/thoughts
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
