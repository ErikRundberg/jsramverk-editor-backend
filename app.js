require('dotenv').config()

const express = require('express');
const { Server } = require("socket.io");
const logger = require('morgan');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema } = require("graphql");

const indexRouter = require('./routes/index');
const docsRouter = require('./routes/docs');
const authRouter = require('./routes/auth');
const emailRouter = require('./routes/email');
const middleware = require("./config/middleware");

const documentFacade = require("./models/documentFacade");
const RootQueryType = require("./graphql/root.js");

const app = express();
const port = process.env.PORT || 1338;
const httpServer = require("http").createServer(app);

const visual = true;
const schema = new GraphQLSchema({
  query: RootQueryType
});


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
app.use('/user', authRouter);
app.use('/email', emailRouter);
app.use(middleware.checkToken);
app.use('/docs', docsRouter);
app.use('/graphql', middleware.checkToken);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: visual,
}));
app.use(middleware.missingPath);
app.use(middleware.errorHandler);


httpServer.listen(port, () => {
  console.log('jsramverk editor api listening on port ' + port);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let throttleTimer;
io.sockets.on("connection", (socket) => {
  socket.on("create", (room) => {
    socket.join(room);
  });

  socket.on("doc", (data) => {
    socket.broadcast.to(data._id).emit("update", data);
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(async () => {
      if (data._id) {
        console.log("Saving to database");
        await documentFacade.saveDoc(data);
      }
    }, 2000);
  })
})

module.exports = app;
