import dotenv from "dotenv";
import app from "./server";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? "./.prod.env" : "./.dev.env",
});

app.listen(process.env.PORT, () => {
  console.log(
    `✅ Server listenting on port http://localhost:${process.env.PORT} 🚀`
  );
});
