import "dotenv/config.js";
import "./db.ts";
import app from "./server";

app.listen(process.env.PORT!, () => {
  console.log(
    `✅ Server listenting on port http://localhost:${process.env.PORT!} 🚀`
  );
});
