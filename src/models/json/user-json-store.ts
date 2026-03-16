import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const userJsonStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user: any) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async getUserById(id: string) {
    await db.read();
    const found = db.data.users.find((user: any) => user._id === id);
    return found ?? null;
  },

  async getUserByEmail(email: string) {
    await db.read();
    const found = db.data.users.find((user: any) => user.email === email);
    return found ?? null;
  },

  async deleteUserById(id: string) {
    await db.read();
    const index = db.data.users.findIndex((user: any) => user._id === id);
    if (index !== -1) db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
