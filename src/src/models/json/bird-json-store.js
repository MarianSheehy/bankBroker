import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const birdJsonStore = {
  async getAllBirds() {
    await db.read();
    return db.data.birds;
  },

  async addBird(placeId, bird) {
    await db.read();
    bird._id = v4();
    bird.placeid = placeId;
    db.data.birds.push(bird);
    await db.write();
    return bird;
  },

  async getBirdsByPlaceId(id) {
    await db.read();
    let t = db.data.birds.filter((bird) => bird.placeid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getBirdById(id) {
    await db.read();
    let t = db.data.birds.find((bird) => bird._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteBird(id) {
    await db.read();
    const index = db.data.birds.findIndex((bird) => bird._id === id);
    if (index !== -1) db.data.birds.splice(index, 1);
    await db.write();
  },

  async deleteAllBirds() {
    db.data.birds = [];
    await db.write();
  },

  async updateBird(bird, updatedBird) {
    bird.title = updatedBird.title;
    bird.date = updatedBird.date;
    bird.other = updatedBird.other;
    await db.write();
  },
};
