import { Server } from "http";
import app from "./app";
import config from "./config";

const run = () => {
  try {
    const server: Server = app.listen(config.port, () =>
      console.log(`Lit Haven Running on http://localhost:${config.port}`)
    );

    const exitHandler = () => {
      if (server) server.close(() => console.log("Server Closed."));

      process.exit(1);
    };

    const unexpectedErrorHandler = (err: unknown) => {
      console.log(err);
      exitHandler();
    };

    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);

    process.on("SIGTERM", () => {
      console.log("SIGTERM Received !");
      if (server) server.close();
    });
  } catch (err) {
    console.log(err);
  }
};

run();
