// Requiring base libraries
const fs = require('fs');
const express = require('express');
const kernel = require("../kernel/kernel");

// Defining router
const router = express.Router();

// When seed and password are received
router.get('/ping', (req, res) => {

    // Sending true status
    res.send("2419");
});

// Exporing router for global use
module.exports = router;