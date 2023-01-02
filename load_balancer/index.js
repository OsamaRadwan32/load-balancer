const express = require("express");
const dotenv = require("dotenv");
const { processRequest } = require("./controllers/loadBalancerController");
const app = express();
dotenv.config();

// ----------------------------------
// Routes
// ----------------------------------
app.post("/request", processRequest);

// ----------------------------------
// Run App
// ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error while starting load balancer: ${error}`);
  } else {
    console.log(`----------------------------------`);
    console.log(`Load Balancer started on port ${PORT}`);
    console.log(`----------------------------------`);
  }
});
