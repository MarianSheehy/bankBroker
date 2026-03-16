import type { User, UserStore } from "../../types/report-types.js";
import { UserMongoose } from "./user.js";

export const userStore: UserStore = {
  async find(): Promise<User[]> {
    const users = await UserMongoose.find().lean();
    return users as User[];
  },

  async findOne(id: string): Promise<User | null> {
    if (!id) return null;
    const user = await UserMongoose.findOne({ _id: id }).lean();
    return user as User | null;
  },

  async add(user: Partial<User>): Promise<User | null> {
    const newUser = new UserMongoose(user);
    const saved = await newUser.save();
    return saved.toObject() as User;
  },

  async findBy(email: string): Promise<User | null> {
    const user = await UserMongoose.findOne({ email }).lean();
    return user as User | null;
  },

  async deleteOne(id: string): Promise<void> {
    try {
      await UserMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("Failed to delete user with id:", id);
    }
  },

  async delete(): Promise<void> {
    await UserMongoose.deleteMany({});
  },
};
