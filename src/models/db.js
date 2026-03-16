import { userMemStore } from "./mem/user-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";
import { bankMemStore } from "./mem/bank-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { bankJsonStore } from "./json/bank-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { bankMongoStore } from "./mongo/bank-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placeStore: null,
  bankStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.placeStore = placeJsonStore;
        this.bankStore = bankJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.bankStore = bankMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.placeStore = placeMemStore;
        this.bankStore = bankMemStore;
    }
  }
};

export function connectDb(dbType) {
  switch (dbType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
}
