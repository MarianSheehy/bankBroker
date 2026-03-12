import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const bankbrokerService = {
  bankbrokerUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.bankbrokerUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.bankbrokerUrl}/api/users/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.bankbrokerUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },

  async getAllUsers() {
    const res = await axios.get(`${this.bankbrokerUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.bankbrokerUrl}/api/users`);
    return res.data;
  },

  async createPlace(place) {
    const res = await axios.post(`${this.bankbrokerUrl}/api/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const response = await axios.delete(`${this.bankbrokerUrl}/api/places`);
    return response.data;
  },

  async deletePlace(id) {
    const response = await axios.delete(`${this.bankbrokerUrl}/api/places/${id}`);
    return response;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.bankbrokerUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.bankbrokerUrl}/api/places/${id}`);
    return res.data;
  },

  async getAllBanks() {
    const res = await axios.get(`${this.bankbrokerUrl}/api/banks`);
    return res.data;
  },

  async createBank(id, bank) {
    const res = await axios.post(`${this.bankbrokerUrl}/api/places/${id}/banks`, bank);
    return res.data;
  },

  async deleteAllBanks() {
    const res = await axios.delete(`${this.bankbrokerUrl}/api/banks`);
    return res.data;
  },

  async getBank(id) {
    const res = await axios.get(`${this.bankbrokerUrl}/api/banks/${id}`);
    return res.data;
  },

  async deleteBank(id) {
    const res = await axios.delete(`${this.bankbrokerUrl}/api/banks/${id}`);
    return res.data;
  },
};