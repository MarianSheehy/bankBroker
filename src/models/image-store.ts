import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};

cloudinary.config(credentials);

export const imageStore = {
  async getAllImages(): Promise<cloudinary.ResourceApiResponse["resources"]> {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  async uploadImage(imagefile: Buffer): Promise<string> {
    writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.v2.uploader.destroy(publicId, {});
  },
};
