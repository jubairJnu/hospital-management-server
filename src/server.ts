import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

let server: Server;

console.log("port", config.port);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    console.log("database connect");

    server = app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", (err) => {
  console.log(
    err,
    `😈 unahandledRejection is detected , shutting down ...`,
    err
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈  uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
