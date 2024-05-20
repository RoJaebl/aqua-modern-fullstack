import express from "express";
import session from "express-session";
import morgan from "morgan";
import rootRouter from "./routers/root.router";
import userRouter from "./routers/user.router";
import videoRouter from "./routers/video.router";
import localsMiddleware from "./middlewares/locals.middleware";
import proxy from "express-http-proxy";
import MongoStore from "connect-mongo";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use(localsMiddleware);
app.use("/public", proxy("http://localhost:3000"));
app.use("/uploads", express.static("uploads"));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
