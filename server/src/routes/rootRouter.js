import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import bookListRouter from "./api/v1/BookListRouter.js";
import bookRouter from "./api/v1/bookRouter.js";
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
//place your server-side routes here
rootRouter.use("/api/v1/bookLists", bookListRouter);
rootRouter.use("/api/v1/books", bookRouter);

export default rootRouter;
