import * as dotenv from "dotenv";
import Mongoose from "mongoose";
import * as mongooseSeeder from "mais-mongoose-seeder";
import { bankMongoStore } from "./bank-mongo-store.js";
import { userMongoStore } from "./user-mongo-store.js";
import { reportsMongoStore } from "./reports-mongo-store.js";
import { seedData } from "./seed-data.js";


const seedLib = mongooseSeeder.default;

async function seed() {
  const seeder = seedLib(Mongoose);
  const dbData = await seeder.seed(seedData, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

export function connectMongo() {
  dotenv.config();

  Mongoose.set("strictQuery", true);
  Mongoose.connect(process.env.db);
  const db = Mongoose.connection;

  db.on("error", (err) => {
    console.log(`database connection error: ${err}`);
  });

  db.on("disconnected", () => {
    console.log("database disconnected");
  });

  db.once("open", function () {
    console.log(`database connected to ${this.name} on ${this.host}`);
    seed();
  });

  db.userStore = userMongoStore;
  db.bankStore = bankMongoStore;
  db.reportStore = reportsMongoStore;
}

