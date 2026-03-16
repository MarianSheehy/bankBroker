import { v4 } from "uuid";

let users: any[] = [];

export const userMemStore = {
  async getAllUsers() {
    return users;
  },

  async addUser(user: any) {
    user._id = v4();
    users.push(user);
    return user;
  },

  async getUserById(id: string) {
    const found = users.find((user) => user._id === id);
    return found ?? null;
  },

  async getUserByEmail(email: string) {
    const found = users.find((user) => user.email === email);
    return found ?? null;
  },

  async deleteUserById(id: string) {
    const index = users.findIndex((user) => user._id === id);
    if (index !== -1) users.splice(index, 1);
  },

  async deleteAll() {
    users = [];
  },
};
