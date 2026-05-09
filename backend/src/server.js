import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`
=================================
Server Running Successfully
PORT: ${env.PORT}
MODE: ${env.NODE_ENV}
=================================
`);
});
