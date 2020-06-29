const express = require("express");
const router = express.Router();

router.get("/", (request, response, next) => {
  response.status(200).json({
    message: "Handling GET requests to /datapoints",
  });
});

module.exports = router;
