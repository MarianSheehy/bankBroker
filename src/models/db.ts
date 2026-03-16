import { connectMongo } from "./mongo/connect.js";
import type { Db } from "../types/report-types.js";

export const db = {} as Db;

export function connectDb(storeType: string): void {
  switch (storeType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
      console.error(`Unsupported store type: "${storeType}"`);
      break;
  }
}
