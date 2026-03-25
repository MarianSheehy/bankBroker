// src/models/mongo/plaid-item-store.ts
import mongoose from "mongoose";

export interface PlaidItemRecord {
  userId: string;
  itemId: string;
  accessToken: string;
  cursor: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const plaidItemSchema = new mongoose.Schema<PlaidItemRecord>(
  {
    userId: { type: String, required: true },
    itemId: { type: String, required: true },
    accessToken: { type: String, required: true },
    cursor: { type: String, default: null },
  },
  { timestamps: true } // createdAt, updatedAt
);

plaidItemSchema.index({ userId: 1, itemId: 1 }, { unique: true });

export const PlaidItem =
  mongoose.models.PlaidItem ||
  mongoose.model<PlaidItemRecord>("PlaidItem", plaidItemSchema);

export async function upsertPlaidItem(params: {
  userId: string;
  itemId: string;
  accessToken: string;
  cursor?: string | null;
}): Promise<PlaidItemRecord> {
  const { userId, itemId, accessToken, cursor = null } = params;

  const doc = await PlaidItem.findOneAndUpdate(
    { userId, itemId },
    { userId, itemId, accessToken, cursor },
    { returnDocument: "after", upsert: true }
  ).lean<PlaidItemRecord>();

  if (!doc) {
    throw new Error("Failed to upsert Plaid item");
  }
  return doc;
}

export async function findPlaidItemByUserAndItem(
  userId: string,
  itemId: string
): Promise<PlaidItemRecord | null> {
  return PlaidItem.findOne({ userId, itemId })
    .lean<PlaidItemRecord>()
    .exec();
}

export async function updatePlaidItemCursor(
  userId: string,
  itemId: string,
  cursor: string
): Promise<void> {
  await PlaidItem.updateOne(
    { userId, itemId },
    { $set: { cursor } }
  ).exec();
}
