import Mongoose from "mongoose";
import { Bird } from "./bird.js";

export const birdMongoStore = {
  async getAllBirds() {
    const birds = await Bird.find().lean();
    return birds;
  },

  async addBird(placeId, bird) {
    bird.placeid = placeId;
    const newBird = new Bird(bird);
    const birdObj = await newBird.save();
    return this.getBirdById(birdObj._id);
  },

  async getBirdsByPlaceId(id) {
    const birds = await Bird.find({ placeid: id }).lean();
    return birds;
  },

  async getBirdById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const bird = await Bird.findOne({ _id: id }).lean();
      return bird;
    }
    return null;
  },

  async deleteBird(id) {
    try {
      await Bird.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllBirds() {
    await Bird.deleteMany({});
  },

  async updateBird(bird, updatedBird) {
    const birdDoc = await Bird.findOne({ _id: bird._id });
    birdDoc.title = updatedBird.title;
    birdDoc.artist = updatedBird.artist;
    birdDoc.duration = updatedBird.duration;
    await birdDoc.save();
  },
};