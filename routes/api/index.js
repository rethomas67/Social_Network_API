const router = require("express").Router();
const testRoutes = require("./testRoutes");
const userRoutes = require("./userRoutes");

router.use("/tests", testRoutes);
router.use("/users", userRoutes);

module.exports = router;
