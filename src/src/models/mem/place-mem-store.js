import { v4 } from "uuid";
import { birdMemStore } from "./bird-mem-store.js";

let places = [];

export const placeMemStore = {
  async getAllPlaces() {
    return places;
  },

  async addPlace(place) {
    place._id = v4();
    places.push(place);
    return place;
  },

  async getPlaceById(id) {
    const list = places.find((place) => place._id === id);
    if (list) {
      list.birds = await birdMemStore.getBirdsByPlaceId(list._id);
      return list;
    }
    return null;
  },

  async getUserPlaces(userid) {
    return places.filter((place) => place.userid === userid);
  },

  async deletePlaceById(id) {
    const index = places.findIndex((place) => place._id === id);
    if (index !== -1) places.splice(index, 1);
  },

  async deleteAllPlaces() {
    places = [];
  },
};
