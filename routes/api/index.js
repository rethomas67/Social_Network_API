const router = require("express").Router();
const testRoutes = require("./testRoutes");
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/tests", testRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
