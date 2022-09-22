require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const docsRouter = require('./routes/docs');
const middleware = require("./config/middleware");

const app = express();
const port = process.env.PORT || 1338;
const httpServer = require("http").createServer(app);

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

// Skip log if test environment
if (process.env.NODE_ENV !== "local") {
  app.use(logger("combined")); // Combined = Apache style LOGs
}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middleware.logPath)
app.use('/', indexRouter);
app.use('/docs', docsRouter);
app.use(middleware.missingPath);
app.use(middleware.errorHandler);


httpServer.listen(port, () => {
  console.log('jsramverk editor api listening on port ' + port);
});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.sockets.on("connection", function(socket) {
  socket.on("create", function(room) {
    // ??? ;)
  })
})

module.exports = app;
