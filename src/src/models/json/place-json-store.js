<<<<<<< HEAD
import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { bankJsonStore } from "./bank-json-store.js";

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(place) {
    await db.read();
    place._id = v4();
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlaceById(id) {
    await db.read();
    let list = db.data.places.find((place) => place._id === id);
    if (list) {
      list.banks = await bankJsonStore.getBanksByPlaceId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlaces(userid) {
    await db.read();
    return db.data.places.filter((place) => place.userid === userid);
  },

  async deletePlaceById(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },
};
=======
import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { bankJsonStore } from "./bank-json-store.js";

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(place) {
    await db.read();
    place._id = v4();
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlaceById(id) {
    await db.read();
    let list = db.data.places.find((place) => place._id === id);
    if (list) {
      list.banks = await bankJsonStore.getBanksByPlaceId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlaces(userid) {
    await db.read();
    return db.data.places.filter((place) => place.userid === userid);
  },

  async deletePlaceById(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },
};
>>>>>>> 9eb855dcce3925702cc09dcdc94d360e637093b8
