import { userMemStore } from "./mem/user-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";
import { birdMemStore } from "./mem/bird-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { birdJsonStore } from "./json/bird-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { birdMongoStore } from "./mongo/bird-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placeStore: null,
  birdStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.placeStore = placeJsonStore;
        this.birdStore = birdJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.placeStore = placeMongoStore;
        this.birdStore = birdMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.placeStore = placeMemStore;
        this.birdStore = birdMemStore;
    }
  }
};
