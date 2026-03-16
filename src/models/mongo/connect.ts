import dotenv from "dotenv";
import Mongoose from "mongoose";
// @ts-ignore — mais-mongoose-seeder lacks type declarations
import * as mongooseSeeder from "mais-mongoose-seeder";
import { userStore } from "./user-store.js";
import { seedData } from "./seed-data.js";
import { reportStore } from "./report-store.js";
import { bankStore } from "./bank-store.js";
import type { Db } from "../../types/report-types.js";

const seedLib = mongooseSeeder.default;

async function seed(): Promise<void> {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, {
    dropDatabase: false,
    dropCollections: true,
  });
  console.log("Database seeded:", Object.keys(dbData));
}

export function connectMongo(db: Db): void {
  dotenv.config();

  const connectionString = process.env.db;
  if (!connectionString) {
    console.error("Missing 'db' connection string in environment variables.");
    process.exit(1);
  }

  Mongoose.set("strictQuery", true);
  Mongoose.connect(connectionString);

  const mongoDb = Mongoose.connection;

  db.userStore = userStore;
  db.bankStore = bankStore;
  db.reportStore = reportStore;

  mongoDb.on("error", (err) => {
    console.log(`Database connection error: ${err}`);
  });

  mongoDb.on("disconnected", () => {
    console.log("Database disconnected");
  });

  mongoDb.once("open", () => {
    console.log(`Database connected to ${mongoDb.name} on ${mongoDb.host}`);
    seed();
  });
}
