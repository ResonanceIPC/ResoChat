// Defining libs object for saving all libraries here for exporting
const libs = {};

// Makin every lib as part of kernel
libs.Logs = require("./libs/logs/logs.js");
libs.Rooms = require("./libs/rooms/rooms.js");
libs.Cryptography = require("./libs/cryptography/cryptography.js");
libs.Configurations = require("./libs/configurations/configurations.js");

// Exporting all libs for global use
module.exports = libs;