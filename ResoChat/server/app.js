// Requiring baseic libraries
const express = require("express")
const bodyParser = require('body-parser');
const kernel = require("./kernel/kernel");
const session = require("express-session")
const Socketbased = require("./routes/socketbased")
const app = express()

// Loading configurations from configs.json file
let configurations = kernel.Configurations.load();

// Loading ip and port for listening
const ip = configurations.server.ip;
const port = configurations.server.port;

// Setupping server
app.set('view engine', 'ejs');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Setting up Routers
const test_router = require("./routes/test");
const admin_router = require("./routes/admin");
const urlbased_router = require("./routes/urlbased");
const postbased_router = require("./routes/postbased");

// Using routers
app.use("/test", test_router);
if (configurations.admin.enabled === true) { app.use(configurations.admin.route, admin_router); };
app.use("/urlbased", urlbased_router);
app.use("/postbased", postbased_router);

// Using error handler
app.use(function (req, res, next) {
  if (req.accepts('html')) {
    res.send(kernel.Rooms.error_code);
    return;
  }
  if (req.accepts('json')) {
    res.send(kernel.Rooms.error_code);
    return;
  }
  res.send(kernel.Rooms.error_code);
});

// Setupping websocket server
const server = require('http').createServer(app)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server })

wss.on('connection', Socketbased)

server.listen(port, ip)


// Logging the start of server
if (configurations.logs.show_logs) {
  kernel.Logs.display_log(0, `Resochat is online on  http://${ip}:${port}`)
}
else if (configurations.logs.save_logs) {
  kernel.Logs.save_log(0, `Resochat is online on  http://${ip}:${port}`)
}