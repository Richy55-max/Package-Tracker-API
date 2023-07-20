import express from "express";
import loader from "./src/loaders/index.js";

async function startServer() {
  const app = express();
  await loader({ expressApp: app });
  app.listen(process.env.PORT, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`Server is ready and running on port ${process.env.PORT}`);
  });
}

startServer();
