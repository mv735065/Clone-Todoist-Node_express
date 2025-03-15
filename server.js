let express = require("express");
const cors = require("cors");

let app = express();

let userRouter=require('./app/router/user.router.js')


let projectRouter = require("./app/router/project.router.js");

let taskRouter = require("./app/router/task.router.js");

let commentRouter=require('./app/router/comment.router.js')


const {
    validationErrorHandler,
    notFoundErrorHandler,
    generalErrorHandler,
    catchAllErrorHandler
  }=require('./app/middleware/errorHandler.js')

let corsOrigin = {
  origin: "http://localhost:8000/",
};
app.use(cors(corsOrigin));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/project", projectRouter);

app.use("/task", taskRouter);

app.use('/user',userRouter);

app.use('/comment',commentRouter);

app.use(validationErrorHandler);
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

// Catch-all error handler (should be the last one)
app.use(catchAllErrorHandler);

app.listen(3000, () => {
  console.log("Started connection");
});
