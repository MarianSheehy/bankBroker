import { v4 } from "uuid";

let birds = [];

export const birdMemStore = {
  async getAllBirds() {
    return birds;
  },

  async addBird(placeId, bird) {
    bird._id = v4();
    bird.placeid = placeId;
    birds.push(bird);
    return bird;
  },

  async getBirdsByPlaceId(id) {
    return birds.filter((bird) => bird.placeid === id);
  },

  async getBirdById(id) {
    let foundBird = birds.find((bird) => bird._id === id);
    if (!foundBird) {
      foundBird = null;
    }
    return foundBird;
  },

  async getPlaceBirds(placeId) {
    let foundBirds = birds.filter((bird) => bird.placeid === placeId);
    if (!foundBirds) {
      foundBirds = null;
    }
    return foundBirds;
  },

  async deleteBird(id) {
    const index = birds.findIndex((bird) => bird._id === id);
    if (index !== -1) birds.splice(index, 1);
  },

  async deleteAllBirds() {
    birds = [];
  },

  async updateBird(bird, updatedBird) {
    bird.title = updatedBird.title;
    bird.artist = updatedBird.artist;
    bird.duration = updatedBird.duration;
  },
};
