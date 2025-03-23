import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const birdwatchService = {
  birdwatchUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.birdwatchUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.birdwatchUrl}/api/users/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.birdwatchUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async getAllUsers() {
    const res = await axios.get(`${this.birdwatchUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.birdwatchUrl}/api/users`);
    return res.data;
  },

  async createPlace(place) {
    const res = await axios.post(`${this.birdwatchUrl}/api/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const response = await axios.delete(`${this.birdwatchUrl}/api/places`);
    return response.data;
  },

  async deletePlace(id) {
    const response = await axios.delete(`${this.birdwatchUrl}/api/places/${id}`);
    return response;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.birdwatchUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.birdwatchUrl}/api/places/${id}`);
    return res.data;
  },

  async getAllBirds() {
    const res = await axios.get(`${this.birdwatchUrl}/api/birds`);
    return res.data;
  },

  async createBird(id, bird) {
    const res = await axios.post(`${this.birdwatchUrl}/api/places/${id}/birds`, bird);
    return res.data;
  },

  async deleteAllBirds() {
    const res = await axios.delete(`${this.birdwatchUrl}/api/birds`);
    return res.data;
  },

  async getBird(id) {
    const res = await axios.get(`${this.birdwatchUrl}/api/birds/${id}`);
    return res.data;
  },

  async deleteBird(id) {
    const res = await axios.delete(`${this.birdwatchUrl}/api/birds/${id}`);
    return res.data;
  },
};