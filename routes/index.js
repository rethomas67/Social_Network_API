const router = require("express").Router();
const apiRoutes = require("./api");

//import the modules in the api folder
router.use("/api", apiRoutes);
//should route to /api
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
