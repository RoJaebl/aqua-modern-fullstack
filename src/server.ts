import express from "express";
import session from "express-session";
import morgan from "morgan";
import rootRouter from "./routers/root.router";
import userRouter from "./routers/user.router";
import videoRouter from "./routers/video.router";
import localsMiddleware from "./middlewares/locals.middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET + "",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
